using System;
using System.IO;
using The_Gourmet_Spot_App.Models;
using The_Gourmet_Spot_App.Services;

namespace The_Gourmet_Spot_App.Services
{
    public static class InventoryInitializer
    {
        public static void Initialize(InventoryManager inventory)
        {
            try
            {
                inventory.LoadInventory();
            }
            catch (FileNotFoundException)
            {
                Console.WriteLine("File not found. A new file will be created.");
                inventory.SaveInventory();
            }
        }
    }
}
