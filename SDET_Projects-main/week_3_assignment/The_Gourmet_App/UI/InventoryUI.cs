using The_Gourmet_Spot_App.Services;

namespace The_Gourmet_Spot_App.UI
{
    public class InventoryUI
    {
        private readonly InventoryManager _inventory;
        private readonly UserInputHandler _inputHandler;

        public InventoryUI(InventoryManager inventory, UserInputHandler inputHandler)
        {
            _inventory = inventory;
            _inputHandler = inputHandler;
        }

        public void ManageInventoryItem(string methodName)
        {
            var input = _inputHandler.ReadIngredientInput();

            if (input.HasValue)
            {
                if (methodName == "Add")
                {
                    _inventory.AddInventory(input.Value.name, input.Value.quantity);
                }
                else
                {
                    _inventory.UpdateInventory(input.Value.name, input.Value.quantity);
                }

                _inventory.SaveInventory();
            }
        }
    }
}
