using System.Collections.Generic;

namespace The_Gourmet_Spot_App.Models
{
    public class MenuItem : IOrderItem
    {
        public string Name { get; private set; }

        public double Price { get; private set; }
        
        public Dictionary<string, int> Ingredients { get; private set; }

        public MenuItem(string name, double price)
        {
            Name = name;
            Price = price;
            Ingredients = new Dictionary<string, int>();
        }
    }
}