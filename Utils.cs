using Microsoft.AspNetCore.Mvc;

namespace Check_Management;

public class Utils
{
    public static object GetResponseObject(int code, string message, object? additionalData = null)
    {
        var response = new
        {
            code = code,
            status = Constants.StatusMap[code].StatusName,
            success = Constants.StatusMap[code].Success,
            message = message,
            data = additionalData // Include the additional data in the response object
        };

        return response;
    }
}

public class ControllerUtils
{
    public static IActionResult HandleError(ControllerBase controller, Func<IActionResult> action, int errorCode = 500)
    {
        try
        {
            return action.Invoke();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return controller.Ok(Utils.GetResponseObject(errorCode, e.Message));
        }
    }
}