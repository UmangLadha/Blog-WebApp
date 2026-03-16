using System.Collections.Generic;

public class MenuItem
{
    public string Name;
    public double Price;
    public Dictionary<string, int> Ingredients;
    public MenuItem(string name, double price)
    {
        Name = name;
        Price = price;
        Ingredients = new Dictionary<string, int>();
    }
}
