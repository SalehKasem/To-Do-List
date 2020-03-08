using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


public partial class Register : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void register_Click(object sender, EventArgs e)
    {
        using (var db = new ToDoListDB())
        {
            user foundeduser = null;
            foundeduser = db.users.Where(i => i.Email == emailInput.Text)
                .DefaultIfEmpty(null)
                .First();
            //check if there's empty input field
            if (checkEmptyInput())
            {
                //There is no such a user , so we create new one 
                if (foundeduser == null)
                {
                    if (passwordInput.Text.Equals(confirmedPassword.Text) && passwordInput.Text.Length >= 8)
                    {
                        foundeduser = new user()
                        {
                            FirstName = firstNameInput.Text,
                            LastName = lastNameInput.Text,
                            Email = emailInput.Text,
                            Password = passwordInput.Text
                        };
                        db.users.Add(foundeduser);
                        db.SaveChanges();
                        Response.Redirect("Login.aspx");
                    }
                    else
                    {
                        Response.Write("<script>alert(' passwords must be the same and greater than 8 charcters!')</script>");
                        passErrMsg.Visible = true;
                        passwordInput.Text = "";
                        confirmedPassword.Text = "";

                    }
                }
                else
                {
                    Response.Write("<script>alert(' username is already exists!')</script>");
                    regErrMsg.Visible = true;
                    emailInput.Text = "";
                    passwordInput.Text = "";
                    confirmedPassword.Text = "";
                }
            }

        }
    }
    //checks empty input fields
    protected bool checkEmptyInput()
    {
        if (firstNameInput.Text.Equals("") || lastNameInput.Text.Equals("")
            || emailInput.Text.Equals("") || passwordInput.Text.Equals("")
            || confirmedPassword.Text.Equals(""))
            return false;
        return true;
    }
}
