using System.Collections.Generic;
using The_Gourmet_Spot_App.Models;

namespace The_Gourmet_Spot_App.Services
{
    public interface IInventoryStorage
    {
        Dictionary<string, Ingredient> Load();
        
        void Save(Dictionary<string, Ingredient> inventory);
    }
}
