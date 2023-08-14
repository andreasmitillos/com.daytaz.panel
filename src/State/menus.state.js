import { proxy } from "valtio";
import fetchApi from "./fetch";

const data = proxy({ restaurants: {}, menu: {} });

const actions = {
  // get menus
  getMenus: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("get", "/restaurants/menus", values)
        .then((response) => {
          data.restaurants[values.restaurantId] = response.data?.menus;
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // create menu
  createMenu: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/menus", values)
        .then((response) => {
          let { restaurantId } = values;
          if (
            data.restaurants[restaurantId] &&
            data.restaurants[restaurantId].draft &&
            data.restaurants[restaurantId].draft?.length > 0
          ) {
            data.restaurants[restaurantId].draft = [
              ...data.restaurants[restaurantId].draft,
              response.data?.menu,
            ];
          } else {
            data.restaurants[restaurantId].draft = [response.data?.menu];
          }

          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // get items
  getItems: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("get", "/restaurants/menus/items", values)
        .then((response) => {
          let { menuId } = values;
          data.menu[menuId] = response.data.menu;
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // create category
  createCategory: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/menus/categories", values)
        .then((response) => {
          if (data.menu[values.menuId]) {
            data.menu[values.menuId].categories = [
              ...data.menu[values.menuId].categories,
              response.data.category,
            ];
          }
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // create subcategory
  createSubCategory: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/menus/subCategories", values)
        .then((response) => {
          let subCategory = response.data.subCategory;
          let category = response.data.category;

          if (data.menu[subCategory.menuId]) {
            // find category index
            data.menu[subCategory.menuId].categories.forEach((value, index) => {
              if (value.id === category.id) {
                data.menu[subCategory.menuId].categories[index].subCategories =
                  [
                    ...data.menu[subCategory.menuId].categories[index]
                      .subCategories,
                    subCategory,
                  ];
              }
            });
          }
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // create item
  createItem: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/menus/items", values)
        .then((response) => {
          let item = response.data.item;
          let { subCategoryId, categoryId, menuId } = item;

          // check if menu has been downloaded
          if (data.menu[menuId]) {
            // check if the item belongs to a Category
            if (categoryId && !subCategoryId) {
              // loop categories to check for matching categoryId
              data.menu[menuId].categories.forEach((category, index) => {
                // check if this is the category we are interested in
                if (category.id === categoryId) {
                  // found the category, add the item
                  data.menu[menuId].categories[index].items = [
                    ...data.menu[menuId].categories[index].items,
                    item,
                  ];
                }
              });
            }

            // check if the item belongs to a Subcategory
            if (subCategoryId && categoryId) {
              data.menu[menuId].categories.forEach((category, index) => {
                // check if this is the category we are interested in
                if (category.id === categoryId) {
                  // found the category, add the item
                  data.menu[menuId].categories[index].subCategories.forEach(
                    (subCategory, subCategoryIndex) => {
                      if (subCategoryId === subCategory.id) {
                        data.menu[menuId].categories[index].subCategories[
                          subCategoryIndex
                        ].items = [
                          ...data.menu[menuId].categories[index].subCategories[
                            subCategoryIndex
                          ].items,
                          item,
                        ];
                      }
                    },
                  );
                }
              });
            }
          }

          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },
};

export default { data, actions };
