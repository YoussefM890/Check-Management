using System.ComponentModel.DataAnnotations;

namespace Check_Management.Models;

public class Check
{
    public int CheckId { get; set; }

    [Required(ErrorMessage = "Check Number is requiredss")]
    public int? CheckNumber { get; set; }

    public bool IsCashed { get; set; }
    public decimal Amount { get; set; }
    public string? Notes { get; set; }
    public string Recipient { get; set; }
    public DateTime CashDate { get; set; }
    public DateTime? DepositDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    //relationship
    public int UserId { get; set; }
    public User User { get; set; }
}

public class CheckIn
{
    [Required(ErrorMessage = "Check Number is required")]
    public int? CheckNumber { get; set; }

    public bool IsCashed { get; set; }
    public decimal Amount { get; set; }
    public string? Notes { get; set; }
    public string Recipient { get; set; }
    public DateTime CashDate { get; set; }
    public DateTime? DepositDate { get; set; } // New column for when funds are deposited
}
//create a dummy json for checkin