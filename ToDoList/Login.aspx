<%@ Page Title="Home" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="card border-primary mb-3 login-register-form" id="loginForm">
        <asp:Panel runat="server" ID="Panel1">

            <h3> <img src="pictures/TDL_Logo.png" width="20" height="20" /> Login</h3>
            <p>
                Username(email):<br/>
                <asp:TextBox runat="server" ID="usernameInput" TextMode="SingleLine" 
                    class="form-control" aria-describedby="emailHelp" type="email" placeholder="Enter username"></asp:TextBox>
            </p>
            <p>
                Password:<br />
                <asp:TextBox runat="server" ID="passwordInput" TextMode="Password"
                    class="form-control" type="password" placeholder="Password"></asp:TextBox>
            </p>
            <p>
                <asp:Button  id="loginBtn"  class="btn btn-primary btn-lg btn-block"  runat="server" Text="Sign in" OnClick="loginBtn_Click" />
            </p>
            <p>
                <a href="Register.aspx" style="float: left">Not a member yet? Sign up for free</a>
            </p>
            <br />
            <asp:Label runat="server" ID="loginErrMsg" ForeColor="Red" Visible="false">Error credentials, try again..</asp:Label>
        </asp:Panel>
     </div>
</asp:Content>


