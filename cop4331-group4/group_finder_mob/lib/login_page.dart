import 'dart:convert';
import 'dart:developer';
//import 'dart:io';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

import 'package:flutter/material.dart';
import 'package:group_finder_mob/empty-table.dart';
import 'package:group_finder_mob/forgot_password_page.dart';
import 'package:group_finder_mob/register_page.dart';
import 'package:group_finder_mob/storage.dart';
import 'package:group_finder_mob/test-table.dart';
import 'url.dart';
import 'home_page.dart';

import 'package:http/http.dart';

class LoginPage extends StatefulWidget {
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {

  final dataStorage = Storage();
  TextEditingController usernameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  bool canLogin = false;
  bool showError = false;
  String errorMsg = '';

  @override
  Widget build(BuildContext context) {



    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('images/BackgroundUCF.webp'),
          fit: BoxFit.cover,
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: _page(),
      ),
    );
  }

  Widget _page(){
  return Container(
    padding: EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: Colors.black.withOpacity(0.7),
    ),
    child: Padding(
      padding: const EdgeInsets.all(32.0),
      child: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _icon(),
              const SizedBox(height: 5,),
              _pageNameText(),
              const SizedBox(height: 10,),
              _inputField("Username", usernameController),
              const SizedBox(height: 30,),
              _inputField("Password", passwordController, isPassword: true),
              const SizedBox(height: 15,),
              if(showError) _errorMsg(),
              const SizedBox(height: 15,),
              _loginButton(),
              const SizedBox(height: 5,),
              _registerButton(),
              const SizedBox(height: 5,), // Add some space between register button and forgot password link
              _forgotPasswordLink(), // Add the Forgot Password link
              const SizedBox(height: 20,),
            ],
          ),
        ),
      ),
    ),
  );
}

Widget _forgotPasswordLink() {
  return TextButton(
    onPressed: () {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => ForgotPasswordPage()),
      );
    },
    child: const Text(
      "Forgot Password?",
      style: TextStyle(
        color: Colors.white,
        decoration: TextDecoration.underline,
      ),
    ),
  );
}




  Widget _icon(){
  return Container(
    child: Image.asset(
      'images/AKS2.webp', 
      //'images/AKS.PNG', 
      width: 175, 
      height: 175, 
    ),
  );
}


  Widget _inputField(String hintText, TextEditingController controller, {isPassword = false}){
  var border = OutlineInputBorder(
    borderRadius: BorderRadius.circular(10),
    borderSide: BorderSide(color: Color(0xFFFFD700)),
  );
  return TextField(
    style: TextStyle(color: Colors.black),
    controller : controller,
    decoration: InputDecoration(
      hintText: hintText,
      hintStyle: TextStyle(color: Colors.black),
      enabledBorder: border,
      focusedBorder: border,
      filled: true,
      fillColor: Colors.white, 
    ),
    obscureText: isPassword,
  );
}


  Widget _loginButton() {
  return ElevatedButton(
    onPressed: () {
      debugPrint("Username : " + usernameController.text);
      debugPrint("Password : " + passwordController.text);
      createJson();
    }, 
    style: ElevatedButton.styleFrom(
      backgroundColor: Color(0xFFFFD700), // Change the background color of the button
    ),
    child: const SizedBox(
      child: Text(
        "Sign in",
        style: TextStyle(
          color: Colors.black, // Change the text color
        ),
      ),
    ),
  );
}


  Widget _errorMsg() {
    return Text(
      errorMsg,
      textAlign: TextAlign.center,
      style: TextStyle(
        color: Colors.red[900],
        fontSize: 18.0,
        fontWeight: FontWeight.bold,
        shadows: [
          Shadow(
            color: Colors.black.withOpacity(0.5), // Subtle black shadow
            offset: const Offset(1, 1), // Shadow offset
            blurRadius: 1, // Shadow blur radius
          ),
        ],
      ),
    );
  }

  Widget _pageNameText() {
    return const Text(
      "Login",
      textAlign: TextAlign.center,
      style: TextStyle(fontSize: 24, color: Colors.white),
    );
  }

  Widget _registerButton() {
    return ElevatedButton(
      onPressed: () {
        Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const RegisterPage()),
            );
      },
      style: ElevatedButton.styleFrom(
      backgroundColor: Color(0xFFFFD700), // Change the background color of the button
    ), 
    child: const SizedBox(
      child: Text(
        "Register",
        style: TextStyle(
          color: Colors.black,
        ),
       ),
      ),
    );
  }

  void createJson() {
    Map map = {
      'username' : usernameController.text,
      'password' : passwordController.text,
    };

   // log(jason);
    _postData(map);
  }

// Post Request that hits https://cop4331-group4-31270b548dd6.herokuapp.com/api/login 
/*
    {
        "username": "RickL",
      "password": "COP4331@"
    }
*/
  Future<void> _postData(Map json) async {
    var jason = jsonEncode(json);
      try {
          final response = await post(
              Uri.parse('${url}api/login'),
              headers: <String, String>{
                  'Content-Type': 'application/json; charset=UTF-8',
              },
              body: jason
              
          );

          // Handle the response based on its status code
          if (response.statusCode == 200) {
            
            // Decodes JWT made token 
            final responseData = jsonDecode(response.body);
            final token = responseData['token'];
            final jwt = JWT.decode(token);
            log('Payload: ${jwt.payload}');
            dataStorage.storeToken(token);
            dataStorage.storePassword(json['password']);


            // Redirect to home page
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => HomePage()),
            ); 
          } 
          else 
          {
            final responseData = jsonDecode(response.body);
            // Maybe add pop up to show user login has failed
            log('Response status code: ${response.statusCode}');
            log('Response body: ${response.body}');
            setState(() {
              showError = true;
              if(responseData['error'] == 'User not found (in login endpoint)') {
                errorMsg = 'User not found. Please register';
              }
              if(responseData['error'] == 'Incorrect password (in login endpoint)') {
                errorMsg = 'Incorrect password';
              }
            });
          }
      } catch (e) {
          log('Error: $e');
      }
  }
}