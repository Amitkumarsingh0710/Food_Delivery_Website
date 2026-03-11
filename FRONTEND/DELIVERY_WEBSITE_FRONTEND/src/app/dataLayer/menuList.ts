import { MenuSection } from "../model/menuSection";
export function populateMenuList(){
   let  menuSections: MenuSection[] = [
      {
        sectionName: "Starters",
        items: [
         {
    itemId: "ST001",
    name: "Classic Chicken Tikka",
    description: "Boneless chicken chunks marinated in yogurt and spices, roasted in a clay oven.",
    price: 240,
    restaurantId: "R001",
    imgurl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    itemId: "ST002",
    name: "Golden Fried Prawns",
    description: "Fresh prawns batter-fried to golden perfection, served with tartare sauce.",
    price: 320,
    restaurantId: "R002",
    imgurl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "ST003",
    name: "Bruschetta Al Pomodoro",
    description: "Toasted baguette slices topped with fresh tomatoes, basil, garlic, and olive oil.",
    price: 180,
    restaurantId: "R003",
    imgurl: "https://plus.unsplash.com/premium_photo-1677686707466-2c86b174d072?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    itemId: "ST004",
    name: "Hara Bhara Kabab",
    description: "Healthy and delicious spinach and green pea patties, shallow fried.",
    price: 190,
    restaurantId: "R001",
    imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXWQ4A_Fm1HJBtxPCzBr8ZvvuC-dd7I5UTZw&s"
  },
  {
    itemId: "ST005",
    name: "Loaded Nachos",
    description: "Tortilla chips topped with melted cheese, jalapenos, salsa, and sour cream.",
    price: 250,
    restaurantId: "R004",
    imgurl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "ST006",
    name: "Chilli Chicken Dry",
    description: "Diced chicken tossed with onions, capsicum, and spicy soy-chilli sauce.",
    price: 260,
    restaurantId: "R002",
    imgurl: "https://www.yummytummyaarthi.com/wp-content/uploads/2023/03/chilli-chicken-dry-1.jpeg"
  },
  {
    itemId: "ST007",
    name: "Mutton Seekh Kebab",
    description: "Minced mutton spiced with herbs and grilled on skewers.",
    price: 350,
    restaurantId: "R001",
    imgurl: "https://c.ndtvimg.com/2020-01/a39okhfk_620_625x300_21_January_20.jpg"
  },
  {
    itemId: "ST009",
    name: "Stuffed Mushrooms",
    description: "Button mushrooms stuffed with cheese and herbs, baked until golden.",
    price: 210,
    restaurantId: "R004",
    imgurl: "https://downshiftology.com/wp-content/uploads/2023/10/Stuffed-Mushrooms-main-500x500.jpg"
  },
  {
    itemId: "ST010",
    name: "Honey Chilli Potatoes",
    description: "Fried potato fingers tossed in a sweet and spicy sesame honey sauce.",
    price: 160,
    restaurantId: "R002",
    imgurl: "https://rakskitchen.net/wp-content/uploads/2022/07/honey-chilli.jpg"
  }
        ],
        imgurl: "./assets/starters.jpg"
      },
      {
        sectionName: "Main Course",
        items: [
          {
            itemId: "MC001",
            name: "Paneer Butter Masala",
            description: "Soft paneer cubes cooked in rich tomato-butter gravy.",
            price: 250,
            restaurantId: "R001",
            imgurl: "./assets/butterPaneer.jpg"
          },
          {
            itemId: "MC002",
            name: "Grilled Chicken Steak",
            description: "Tender chicken breast served with mashed potatoes and veggies.",
            price: 350,
            restaurantId: "R001",
            imgurl: "./assets/chickenSteak.jpg"
          },
          {
    itemId: "MC003",
    name: "Hyderabadi Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken, saffron, and whole spices.",
    price: 320,
    restaurantId: "R001",
    imgurl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "MC004",
    name: "Dal Makhani",
    description: "Black lentils simmered overnight with butter and cream, served with naan.",
    price: 220,
    restaurantId: "R002",
    imgurl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "MC005",
    name: "Creamy Alfredo Pasta",
    description: "Penne pasta tossed in a rich parmesan and heavy cream sauce with mushrooms.",
    price: 290,
    restaurantId: "R003",
    imgurl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "MC006",
    name: "Thai Green Curry (Veg)",
    description: "Exotic vegetables cooked in spicy green coconut curry, served with jasmine rice.",
    price: 340,
    restaurantId: "R004",
    imgurl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "MC008",
    name: "Veg Hakka Noodles",
    description: "Wok-tossed noodles with crunchy vegetables, soy sauce, and garlic.",
    price: 190,
    restaurantId: "R003",
    imgurl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "MC009",
    name: "Classic Fish & Chips",
    description: "Batter-fried fish fillet served with crispy french fries and tartare sauce.",
    price: 380,
    restaurantId: "R004",
    imgurl: "https://dinnerthendessert.com/wp-content/uploads/2024/02/fish-and-chips-1x1-1.jpg"
  },
  {
    itemId: "MC010",
    name: "Malai Kofta",
    description: "Fried potato and paneer dumplings served in a creamy, sweet cashew gravy.",
    price: 270,
    restaurantId: "R002",
    imgurl: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=600&q=80"
  }
        ],
        imgurl: "./assets/mainCourse.jpg"
      },
      {
        sectionName: "Desserts",
        items: [
          {
            itemId: "DS001",
            name: "Chocolate Lava Cake",
            description: "Warm chocolate cake with gooey molten center.",
            price: 150,
            restaurantId: "R001",
            imgurl: "./assets/lava.webp"
          },
          {
            itemId: "DS002",
            name: "Gulab Jamun",
            description: "Soft milk dumplings soaked in sugar syrup.",
            price: 100,
            restaurantId: "R001",
            imgurl: "./assets/jamun.jpg"
          },
          {
    itemId: "DS003",
    name: "Rasmalai",
    description: "Soft cottage cheese patties immersed in chilled, saffron-flavored milk.",
    price: 140,
    restaurantId: "R001",
    imgurl: "https://palatesdesire.com/wp-content/uploads/2022/09/Rasmalai-recipe@palates-desire.jpg"
  },
  {
    itemId: "DS004",
    name: "Classic Tiramisu",
    description: "Italian coffee-flavoured dessert layered with whipped cream and mascarpone.",
    price: 280,
    restaurantId: "R002",
    imgurl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "DS005",
    name: "New York Cheesecake",
    description: "Rich and creamy baked cheesecake with a graham cracker crust and berry compote.",
    price: 320,
    restaurantId: "R003",
    imgurl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "DS006",
    name: "Gajar Ka Halwa",
    description: "Traditional carrot pudding slow-cooked with milk, ghee, and nuts.",
    price: 160,
    restaurantId: "R001",
    imgurl: "https://www.kuchpakrahahai.in/wp-content/uploads/2024/01/Gajar-halwa.jpg"
  },
  {
    itemId: "DS007",
    name: "Sizzling Brownie",
    description: "Hot walnut brownie served on a sizzler plate with vanilla ice cream and chocolate sauce.",
    price: 220,
    restaurantId: "R004",
    imgurl: "https://www.cookwithkushi.com/wp-content/uploads/2017/01/sizzling_brownie_sundae_ice_cream.jpg"
  },
  {
    itemId: "DS008",
    name: "Mango Mousse",
    description: "Light and airy mango flavored dessert topped with fresh mint.",
    price: 180,
    restaurantId: "R002",
    imgurl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "DS009",
    name: "Kesar Pista Kulfi",
    description: "Traditional dense Indian ice cream flavored with saffron and pistachios.",
    price: 110,
    restaurantId: "R003",
    imgurl: "https://static.toiimg.com/thumb/84786580.cms?imgsize=157368&width=800&height=800"
  }
        ],
        imgurl: "./assets/dessert.webp"
      },
      {
        sectionName: "Beverages",
        items: [
          {
            itemId: "BV001",
            name: "Mango Smoothie",
            description: "Refreshing blend of ripe mangoes and yogurt.",
            price: 120,
            restaurantId: "R001",
            imgurl: "./assets/mango.jpg"
          },
          {
            itemId: "BV002",
            name: "Cold Coffee",
            description: "Iced coffee topped with whipped cream.",
            price: 130,
            restaurantId: "R001",
            imgurl: "./assets/coldCoffee.jpg"
          },
          {
    itemId: "BV003",
    name: "Masala Chai",
    description: "Traditional Indian spiced tea brewed with ginger, cardamom, and milk.",
    price: 60,
    restaurantId: "R002",
    imgurl: "https://cdn.shopify.com/s/files/1/0758/6929/0779/files/Masala_Tea_-_Annams_Recipes_Shop_2_480x480.jpg?v=1732347934"
  },
  {
    itemId: "BV004",
    name: "Virgin Mojito",
    description: "Refreshing mocktail with mint leaves, lemon wedges, sugar, and soda.",
    price: 140,
    restaurantId: "R001",
    imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0cRYcGcMi9dEq-09oOqEDHURSnzdLrEl0Q&s"
  },
  {
    itemId: "BV005",
    name: "Strawberry Milkshake",
    description: "Creamy milkshake blended with fresh strawberries and vanilla ice cream.",
    price: 160,
    restaurantId: "R003",
    imgurl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "BV006",
    name: "Fresh Lime Soda",
    description: "Chilled soda with fresh lime juice, available in sweet or salted variants.",
    price: 90,
    restaurantId: "R004",
    imgurl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "BV007",
    name: "Oreo Crumble Shake",
    description: "Thick chocolate shake blended with Oreo cookies and topped with crumble.",
    price: 180,
    restaurantId: "R001",
    imgurl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "BV008",
    name: "Watermelon Juice",
    description: "Freshly pressed watermelon juice served with ice and a hint of mint.",
    price: 110,
    restaurantId: "R002",
    imgurl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "BV009",
    name: "Hot Cappuccino",
    description: "Espresso-based coffee prepared with steamed milk foam.",
    price: 130,
    restaurantId: "R003",
    imgurl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "BV010",
    name: "Blue Lagoon",
    description: "Vibrant blue mocktail with citrus notes and sparkling water.",
    price: 150,
    restaurantId: "R004",
    imgurl: "https://monin.in/cdn/shop/products/Blue_20Lagoon.png?v=1681306671&width=1024"
  },
  {
    itemId: "BV011",
    name: "Lemon Iced Tea",
    description: "Chilled black tea infused with lemon zest and served with ice cubes.",
    price: 100,
    restaurantId: "R001",
    imgurl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
  },
  {
    itemId: "BV012",
    name: "Punjabi Lassi",
    description: "Thick and creamy yogurt-based drink, topped with malai.",
    price: 120,
    restaurantId: "R002",
    imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3uUvCdXyjP3AO6DgBKIv9FsAxiyEFzgF3mg&s"
  }
        ],
        imgurl: "./assets/beverages.webp"
      }
    ];
    return menuSections;
}