using System;

namespace The_Gourmet_Spot_App.Exceptions
{
    public class InventoryStorageException : Exception
    {
        public InventoryStorageException(string message) : base(message) { }
    }
}
