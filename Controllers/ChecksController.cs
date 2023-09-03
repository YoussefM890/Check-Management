using Check_Management.Models;
using Check_Management.Services;
using Microsoft.AspNetCore.Mvc;

namespace Check_Management.Controllers
{
    [ApiController]
    [Route("[controller]")]
    // [Authorize]
    public class ChecksController : ControllerBase
    {
        private readonly ApplicationDbContext db = new ApplicationDbContext();

        [HttpGet]
        public IActionResult GetAllChecks()
        {
            return ControllerUtils.HandleError(this, () =>
            {
                var checks = CheckService.GetAllChecks();
                return Ok(Utils.GetResponseObject(200, "Checks Retrieved Successfully", checks));
            }, 500);
        }

        [HttpPost]
        public IActionResult AddCheck(CheckIn check)
        {
            return ControllerUtils.HandleError(this, () =>
            {
                var checkOut = CheckService.AddCheck(check);
                return Ok(Utils.GetResponseObject(201, "Check Created", checkOut));
            }, 500);
        }


        [HttpPut]
        public IActionResult EditCheck(CheckIn check)
        {
            return ControllerUtils.HandleError(this, () =>
            {
                var checkOut = CheckService.EditCheck(check);
                return Ok(Utils.GetResponseObject(200, "Check Updated", checkOut));
            }, 500);
        }

        [HttpDelete("{checkNumber}")]
        public IActionResult DeleteCheck(int checkNumber)
        {
            return ControllerUtils.HandleError(this, () =>
            {
                CheckService.DeleteCheck(checkNumber);
                return Ok(Utils.GetResponseObject(200, "Check Deleted"));
            }, 500);
        }

        [HttpPatch("deposit-date/{checkNumber}")]
        public IActionResult PatchCheckDepositDate(int checkNumber)
        {
            return ControllerUtils.HandleError(this, () =>
            {
                var checkOut = CheckService.SetCheckDepositDate(checkNumber);
                return Ok(Utils.GetResponseObject(200, "Check Deposit Date Updated", checkOut));
            }, 500);
        }

        [HttpPatch("set-cashed/{checkNumber}")]
        public IActionResult PatchCheckCashed(int checkNumber)
        {
            return ControllerUtils.HandleError(this, () =>
            {
                var checkOut = CheckService.SetCheckAsCashed(checkNumber);
                return Ok(Utils.GetResponseObject(200, "Check Cashed", checkOut));
            }, 500);
        }
    }
}