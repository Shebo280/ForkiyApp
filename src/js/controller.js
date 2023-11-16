import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarksView from './views/bookmarksView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    //handling empty string or no hash
    if (!id) return;
    recipeView.renderSpinner();
    //Update Results view to mark selected search result
    resultsView.render(model.getSearchResultsPage());
    // 1) Update bookmarks
    bookmarksView.update(model.state.bookmarks);
    // 2) loading Recipe
    // we used await because it's async function so it will return a promise be careful!
    await model.loadRecipe(id);
    const { recipe } = model.state;
    // 3) Rendering Recipe
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResult = async function () {
  try {
    //1- Getting search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    //2- loading search results
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const changingPage = function (check) {
  if (check === 'next') {
    resultsView.render(model.getSearchResultsPage(model.state.search.page + 1));
    paginationView.render(model.state.search);
  } else {
    resultsView.render(model.getSearchResultsPage(model.state.search.page - 1));
    paginationView.render(model.state.search);
  }
};
const controlServing = function (newServings) {
  model.updateServings(newServings);
  //updaate the recipe serving in state

  //update the view

  recipeView.update(model.state.recipe);
};
const controlAddbookMark = function () {
  //1) Add/Remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  //2) Update the view
  recipeView.update(model.state.recipe);
  //3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

controlSearchResult();

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdatingServing(controlServing);
  recipeView.addHandlerAddBookmark(controlAddbookMark);
  searchView.addSearchHandler(controlSearchResult);
  paginationView.addHandlerClick(changingPage);
};
init();
