<%@ Page Title="Home" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeFile="Register.aspx.cs" Inherits="Register" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="card border-primary mb-3 login-register-form" id="registerForm" >
        <asp:Panel runat="server" ID="Panel1">

            <h3> <img src="pictures/TDL_Logo.png" width="20" height="20" /> Register</h3>
            <div>
                First name:<br />
                <asp:TextBox runat="server" ID="firstNameInput" TextMode="SingleLine" 
                     class="form-control" placeholder="Enter your firstName"></asp:TextBox>
            </div>
            <div>
                Last name:<br />
                <asp:TextBox runat="server" ID="lastNameInput" TextMode="SingleLine" 
                     class="form-control" placeholder="Enter your lastName"></asp:TextBox>
            </div>
            <div>
                Username(email):<br />
                <asp:TextBox runat="server" ID="emailInput" TextMode="SingleLine" 
                    class="form-control" aria-describedby="emailHelp" type="email" placeholder="Enter username"></asp:TextBox><br />
                <asp:Label runat="server" ID="regErrMsg" ForeColor="Red" Visible="false">Error, username is already exists, try again..</asp:Label>
            </div>
            <div>
                Password:<br />
                <asp:TextBox runat="server" ID="passwordInput" TextMode="Password"
                    class="form-control" type="password" placeholder="Password"></asp:TextBox>
            </div>
            <div>
               Confirm Password:<br />
                <asp:TextBox runat="server" ID="confirmedPassword" TextMode="Password"
                    class="form-control" type="password" placeholder="ReEnter Password"></asp:TextBox> <br />
                <asp:Label runat="server" ID="passErrMsg" ForeColor="Red" Visible="false">Error, passwords are not the same, try again..</asp:Label>
            </div>
            <div>
                <asp:Button class="btn btn-outline-primary btn-lg btn-block" runat="server" Text="Sign up" Style="float: left" OnClick="register_Click" />
            </div>
            <div>
                <a href="Login.aspx" style="float: left">Already have acount? Login</a>
            </div>
      
        </asp:Panel>
    </div>
</asp:Content>


