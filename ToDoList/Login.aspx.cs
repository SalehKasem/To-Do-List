using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //If the user opened login page and he is already logged in , we send it back to the noteui page(home page).
        if (Session["userId"] != null)
        {
            Response.Redirect("Default.aspx");
        }
    }

    protected void loginBtn_Click(object sender, EventArgs e)
    {
        using (var db = new ToDoListDB())
        {
            var user = db.users.Where(i => i.Email == usernameInput.Text &&
            i.Password == passwordInput.Text).DefaultIfEmpty(null).First();

            if (user == null)
            {
                loginErrMsg.Visible = true;
            }
            else
            {
                //redirect  + update seassion
                HttpContext.Current.Session["userId"] = user.UserId;
                HttpContext.Current.Session["username"] = user.FirstName + " " + user.LastName;
                Response.Redirect("Default.aspx");

            }

        }
    }
}
