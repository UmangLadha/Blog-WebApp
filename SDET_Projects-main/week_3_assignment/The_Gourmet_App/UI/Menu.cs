using System;
using System.Collections.Generic;
using The_Gourmet_Spot_App.Models;

namespace The_Gourmet_Spot_App.UI
{
    public class Menu
    {
        public List<MenuItem> BuildMenu()
        {
            List<MenuItem> menu = new List<MenuItem>();
            MenuItem pizza = new MenuItem("Pizza", 200);
            pizza.Ingredients["onion"] = 2;
            pizza.Ingredients["paneer"] = 2;
            pizza.Ingredients["cheese"] = 3;

            MenuItem burger = new MenuItem("Burger", 150);
            burger.Ingredients["bread"] = 2;
            burger.Ingredients["onion"] = 1;

            menu.Add(pizza);
            menu.Add(burger);
            return menu;
        }

        public static void DisplayMenu(List<MenuItem> items)
        {
            Console.WriteLine("\n--- Menu ---");
            for (int i = 0; i < items.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {items[i].Name} - ₹{items[i].Price}");
            }
        }
    }
}

