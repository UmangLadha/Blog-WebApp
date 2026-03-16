namespace The_Gourmet_Spot_App.Models
{
    public class Ingredient
    {
        public string Name { get; private set; }
        
        public int Quantity { get; set; }

        public Ingredient(string name, int quantity)
        {
            Name = name;
            Quantity = quantity;
        }
    }
}