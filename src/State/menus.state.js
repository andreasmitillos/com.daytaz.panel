import { proxy } from "valtio";
import fetchApi from "./fetch";

const data = proxy({
  restaurants: {},
  menu: {},
  menuInsights: {},
  menuOptionLists: {},
  menuAllergyTags: {},
  menuDietaryRestrictions: {},
});

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

  // get menu insights
  getMenuInsights: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("get", "/restaurants/menus/insights", values)
        .then((response) => {
          let { menu } = response.data;
          data.menuInsights[menu.id] = menu;
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

  // retrieve orderLists
  getOptionLists: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("get", "/restaurants/menus/optionLists", values)
        .then((response) => {
          let { menuId } = values;
          data.menuOptionLists[menuId] = response.data.optionLists;
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // create orderLists
  createOptionList: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/menus/optionList", values)
        .then((response) => {
          let { menuId } = values;
          if (data.menuOptionLists[menuId]) {
            data.menuOptionLists[menuId] = [
              { ...response.data.optionList, optionListItems: [] },
              ...data.menuOptionLists[menuId],
            ];
          }
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // create orderListItems
  createOptionListItem: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/menus/optionListItem", values)
        .then((response) => {
          let menuId = response.data.optionList?.menuId;
          let optionListId = response.data.optionList?.id;

          if (data.menuOptionLists[menuId]) {
            data.menuOptionLists[menuId]?.forEach((optionList, index) => {
              if (optionList.id === optionListId) {
                data.menuOptionLists[menuId][index].optionListItems = [
                  ...data.menuOptionLists[menuId][index]?.optionListItems,
                  response.data?.optionListItem,
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

  // get allergy tags
  getAllergyTags: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("get", "/restaurants/menus/allergyTags", values)
        .then((response) => {
          data.menuAllergyTags[values.menuId] = response.data?.allergyTags;
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // get dietary restrictions
  getDietaryRestrictions: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("get", "/restaurants/menus/dietaryRestrictions", values)
        .then((response) => {
          data.menuDietaryRestrictions[values.menuId] =
            response.data?.dietaryRestrictions;
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // çreate dietary restrictions
  createDietaryRestriction: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/menus/dietaryRestriction", values)
        .then((response) => {
          if (data.menuDietaryRestrictions[values.menuId]) {
            data.menuDietaryRestrictions[values.menuId] = [
              ...data.menuDietaryRestrictions[values.menuId],
              response.data.dietaryRestriction,
            ];
          } else {
            data.menuDietaryRestrictions[values.menuId] = [
              response.data.dietaryRestriction,
            ];
          }

          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // çreate allergy tags
  createAllergyTag: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/menus/allergyTag", values)
        .then((response) => {
          if (data.menuAllergyTags[values.menuId]) {
            data.menuAllergyTags[values.menuId] = [
              ...data.menuAllergyTags[values.menuId],
              response.data.allergyTag,
            ];
          } else {
            data.menuAllergyTags[values.menuId] = [response.data.allergyTag];
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
