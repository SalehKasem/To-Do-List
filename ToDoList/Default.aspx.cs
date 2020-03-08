using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Net;
using Newtonsoft.Json;


public partial class _Default : System.Web.UI.Page
{
    public String username=null;

    protected void Page_Load(object sender, EventArgs e)
    {
        //if (Session["userid"] == null)
        //{
        //    Response.Redirect("Default.aspx");
        //}
        username = Convert.ToString(HttpContext.Current.Session["username"]);
    }

    [WebMethod]
    public static void addTask(task t)
    {
        using (var db = new ToDoListDB())
        {
            t.UserId = Convert.ToInt32(HttpContext.Current.Session["userId"]);
            db.tasks.Add(t);
            db.SaveChanges();
        }


    }

    [WebMethod]
    public static void updateTask(task t)
    {
        using (var db = new ToDoListDB())
        {
            t.UserId = Convert.ToInt32(HttpContext.Current.Session["userId"]);
            var entity = db.tasks.Find(t.id);
            db.Entry(entity).CurrentValues.SetValues(t);
            db.SaveChanges();
        }

    }

    [WebMethod]
    public static string getTasks()
    {
        using (var db = new ToDoListDB())
        {
            int userId = Convert.ToInt32(HttpContext.Current.Session["userId"]);
            var json = JsonConvert.SerializeObject(db.tasks.Where(c => c.UserId == userId));
            return json;
        }
    }


    [WebMethod]
    public static void deleteTask(String taskId)
    {
        using (var db = new ToDoListDB())
        {
            task t = db.tasks.First(c => c.id.Equals(taskId));
            db.tasks.Remove(t);
            db.SaveChanges();
        }
    }

    //sign out and return to log in page
    protected void signOutBtn_Click(object sender, EventArgs e)
    {
                //redirect  + update seassion
        HttpContext.Current.Session["userId"] = null;
        HttpContext.Current.Session["username"] = null;
        Response.Redirect("Login.aspx");

    }


}