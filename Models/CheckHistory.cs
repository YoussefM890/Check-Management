namespace Check_Management.Models;

public class CheckHistory
{
    public int CheckHistoryId { get; set; }
    public int CheckId { get; set; }
    public string PropertyName { get; set; } // Name of the property that was changed
    public string OldValue { get; set; } // Value before the change
    public string NewValue { get; set; } // Value after the change
    public DateTime ChangeDate { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }

    // You can include other properties such as CreatedAt, UpdatedAt, etc.
}