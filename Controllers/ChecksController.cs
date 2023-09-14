using System.Security.Claims;
using Check_Management.Models;
using Check_Management.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Check_Management.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ChecksController : ControllerBase
    {
        private readonly ApplicationDbContext db = new ApplicationDbContext();

        [HttpGet]
        public IActionResult? GetChecks()
        {
            return ControllerUtils.HandleError(this, () =>
            {
                // retrieve the user id from the claims
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty);
                var checks = CheckService.GetChecksByUserId(userId);
                return Ok(Utils.GetResponseObject(200, "Checks Retrieved Successfully", checks));
            }, 500);
        }

        [HttpPost]
        public IActionResult AddCheck(CheckIn check)
        {
            return ControllerUtils.HandleError(this, () =>
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty);
                var checkOut = CheckService.AddCheck(check, userId);
                return Ok(Utils.GetResponseObject(201, "Check Created", checkOut));
            }, 500);
        }


        [HttpPut]
        public IActionResult EditCheck(CheckIn check)
        {
            return ControllerUtils.HandleError(this, () =>
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty);
                if (userId != check.UserId)
                    return Ok(Utils.GetResponseObject(401, "Unauthorized"));
                var checkOut = CheckService.EditCheck(check);
                return Ok(Utils.GetResponseObject(200, "Check Updated", checkOut));
            }, 500);
        }

        [HttpDelete("{checkId}")]
        public IActionResult DeleteCheck(int checkId)
        {
            return ControllerUtils.HandleError(this, () =>
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty);
                if (!CheckService.CheckBelongsToUser(checkId, userId))
                    return Ok(Utils.GetResponseObject(401, "Unauthorized"));
                CheckService.DeleteCheck(checkId);
                return Ok(Utils.GetResponseObject(200, "Check Deleted"));
            }, 500);
        }

        [HttpPatch("deposit-date/{checkId}")]
        public IActionResult PatchCheckDepositDate(int checkId)
        {
            return ControllerUtils.HandleError(this, () =>
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty);
                if (!CheckService.CheckBelongsToUser(checkId, userId))
                    return Ok(Utils.GetResponseObject(401, "Unauthorized"));
                var checkOut = CheckService.SetCheckDepositDate(checkId);
                return Ok(Utils.GetResponseObject(200, "Check Deposit Date Updated", checkOut));
            }, 500);
        }

        [HttpPatch("set-cashed/{checkId}")]
        public IActionResult PatchCheckCashed(int checkId)
        {
            return ControllerUtils.HandleError(this, () =>
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty);
                if (!CheckService.CheckBelongsToUser(checkId, userId))
                    return Ok(Utils.GetResponseObject(401, "Unauthorized"));
                var checkOut = CheckService.SetCheckAsCashed(checkId);
                return Ok(Utils.GetResponseObject(200, "Check Cashed", checkOut));
            }, 500);
        }
    }
}