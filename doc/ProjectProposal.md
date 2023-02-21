# MealMe
> Lina Mei, Andrea Zhou, Hanning Zhang, Kaitlyn Chan
MealMe is a website that helps users to discover, track, and organize their recipes with a simple and user-friendly interface. Users can also receive recommendations based on recipes they’ve liked before, and have the option to filter recipes based on different factors.

### Description 
Oftentimes, it’s difficult to find a specific recipe that meets a person’s constraints. Whether it's a college student looking for a quick and cheap meal, or someone with anaphylaxis searching for a recipe without peanuts, it's annoying to scour pages of google searches to find a singular recipe that satisfies all their requirements. Our application provides a platform for users to discover and manage new recipes that meet their necessities. Based on interactivity with other recipes, our application will offer recommendations to users that they can “favorite” and add to their library to view later. These recommendations can be filtered using different tags, allergies, and inventory. Users can also add their own recipes to keep track of and to share with others. 

### Usefulness
Our application offers a platform for everyone to manage their recipe library, and refer to the recipe database based on their preferences on the ingredients. Users can specify their requirements and filter the recipes that meet their necessities. Users may also create and manage their own recipe library to store their favorite recipes, which can be shared among the users. In addition to that, our application will generate recommendations to users based on their favorite recipes in the library.
Current recipe applications or websites mainly teach you how to cook, with emphasis on processing the ingredients and cooking methods. People nowadays also share their cuisines on social media like Instagram. However, it is hard to tell the ingredients and complexity by the pictures. Our application will serve as a filtering and recommendation system to help you find the recipes that will be suitable for you. Once users have done that, they can naturally turn to the cooking website to look for tips for cooking.

### Data
Describe what data is stored in the database (where it is from, its attributes, what information would be stored). 
There are four main datatables in the database. One of them will have the Recipes data, which is taken directly from Food.com’s RAW_recipes.csv dataset. We will use the recipe name as name (varchar), recipe ID as id (integer), the duration it takes to prepare as minutes (integer), the number of steps in the recipe as n_steps (integer), and the recipe steps as steps (varchar). The primary key of this table would be the recipe ID. The other three relations will require user information, which is from Food.com’s RAW_interactions.csv dataset. The next relation will hold the inventory data. This will include the user id as user_id (integer) from and their inventory as inventory (list of varchar). The user_id will come from Food.com’s user information, and the inventory side is one that we’ll have to populate based on user activity. The primary key of the inventory data would be the user ID. The third datatable is for our favorites feature, which will include the user id as user_id (integer) and the recipe ID of a recipe that the user has favorited as recipe_id (integer). This will come from the RAW_interactions.csv data after converting ratings of 4 and higher to a favorite. The primary key of this datatable would be both the user ID and recipe ID. Lastly, we have a recommendation relation which stores the user id as user_id (integer), the recommendation number as rec_num (integer 1-9), and the recipe id as recipe_id (integer). The recommendations will utilize the recipes, inventory, and favorites data. The primary key of this table would be the user ID along with the recommendation number.

## Functionality
Our application’s main components are the recommendations page, library, and inventory. Users can interact with these parts by adding and liking recipes, maintaining their inventory, and managing their library. 

### Basic Functions
When users first open to the website, a list of all the recipes from the dataset will be displayed on the homepage. Users have the option to favorite a recipe which creates a new tuple with the userId and the recipeId. The tuple is then added to the Favorite dataset. When users unfavorite a recipe, the tuple will be deleted. An insert or delete to the Favorite relation will trigger an pdate to the Recommendation dataset. Users also have the option to record items that they already have in their inventory. By typing in the items, this will update their respective inventory list in the inventory data relation. An update to the Inventory relation will trigger an update to the Recommendation relation. Using the recommendation dataset that we created, there will be a random recipe generator to recommend new recipes based on similar tags from the recipes the users had liked. As the users continue to interact by favoriting and unfavoriting recipes, different recipes will continue to be recommended.

### Creative Components
To improve the functionality of our application, we plan on implementing a “recipe randomizer”. If users want to try a different cuisine or ingredient from their normal preferences, they can visit the randomizer. After pressing a button, the randomizer will filter out the most common tags found in their recipe library, and then randomly select a recipe to display to the user on the page.

### UI Mockup 
> a possible final application interface

<img src="./images/recommendations_page.png" width="85%" height="85%">
<img src="./images/favorites_page.png" width="85%" height="85%">
<img src="./images/inventory_page.png" width="85%" height="85%">

### Project Work Distribution
There are four categories of information that will need to be displayed on the website such as data for the recommended recipes, favorite recipes, user’s inventory, and all the recipes from the dataset. We plan on distributing the tasks and subtasks for database management as follows: 
- Hanning: Recommendations data - managing the top recipe recommendations for a user based on their previous likes and filters
- Lina: Favorites data - managing the recipes that users have liked
- Andrea: Inventory data - managing inventory data as indicated by the user
- Kaitlyn: Recipes data - managing recipes added by users and general recipes that exist in our application 

Aside from the data management, we also have various UI components to implement. Based on each of our data assignment, we plan on dividing the different components as follows: 
- Hanning: Recommendations page - displays and updates the recommendations based on filters selected by the user
- Lina: Favorites page - allows users to manage (view, add, or remove) the recipes they like.
- Andrea: Inventory page - allows users to add or remove ingredients that they have or that they want to cook with.
- Kaitlyn: Recipe Randomizer - when a user pushes a button, randomly generate a recipe that deviates from their usual cuisine and likes. 

