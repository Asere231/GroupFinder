import 'dart:convert';
import 'dart:developer';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:group_finder_mob/storage.dart';
import 'package:pin_code_fields/pin_code_fields.dart';

import 'package:flutter/material.dart';
import 'url.dart';
import 'home_page.dart';

import 'package:http/http.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final dataStorage = Storage();
  final firstNameController = TextEditingController();
  final lastNameController = TextEditingController();
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  final emailController = TextEditingController();
  bool showError = false;

  void createJson() {
    Map map = {
      'firstName': firstNameController.text,
      'lastName': lastNameController.text,
      'username': usernameController.text,
      'password': passwordController.text,
      'email': emailController.text
    };

    _postData(map);
  }

  Future<void> _postData(Map json) async {
    var jason = jsonEncode(json);
    try {
      final response = await post(Uri.parse('${url}api/register'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jason);
      // print(response.statusCode);
      if (response.statusCode == 200) {
        log("good response");
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
          MaterialPageRoute(builder: (context) => ValidationPage()),
        );
      } else if (response.statusCode == 400) {
        log("reponse code: 400");
        //log(jsonDecode(response.body)['error']);
        setState(() {
          showError = true;
        });
      }
    } catch (e) {
      log('Error: $e');
    }
  }

  @override
  void dispose() {
    firstNameController.dispose();
    super.dispose();
  }

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
        appBar: AppBar(
          iconTheme: const IconThemeData(color: Colors.white),
          backgroundColor: Colors.black.withOpacity(0.7),
          toolbarHeight: 32,
        ),
        body: _page(),
      ),
    );
  }

  Widget _page() {
    return  Container(
    //padding: EdgeInsets.all(16), 
    decoration: BoxDecoration(
      color: Colors.black.withOpacity(0.7), 
    ),
    child:Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32.0),
      child: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _icon(),
              const SizedBox(
                height: 10,
              ),
              _pageNameText(),
              const SizedBox(
                height: 5,
              ),
              if (showError) _errorMsg(),
              const SizedBox(
                height: 15,
              ),
              _inputField("First Name", firstNameController),
              const SizedBox(
                height: 25,
              ),
              _inputField("Last Name", lastNameController),
              const SizedBox(
                height: 25,
              ),
              _inputField("Email", emailController),
              const SizedBox(
                height: 25,
              ),
              _inputField("Username", usernameController),
              const SizedBox(
                height: 25,
              ),
              _inputField("Password", passwordController, isPassword: true),
              const SizedBox(
                height: 25,
              ),
              _loginButton(),
              //_backToLoginButton(),
              //_extraText(),
            ],
          ),
        ),
      ),
     ),
    );
  }

Widget _icon(){
  return Container(
    child: Image.asset(
      'images/AKS2.webp', 
      //'images/AKS.PNG', 
      width: 150, 
      height: 150, 
    ),
  );
}

  Widget _errorMsg() {
    return Text(
      "Username already exists or\ninvalid email",
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

  Widget _inputField(String hintText, TextEditingController controller,
      {isPassword = false}) {
    var border = OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: const BorderSide(color: Color(0xFFFFD700)),
    );
    return TextField(
      style: const TextStyle(color: Colors.black),
      controller: controller,
      decoration: InputDecoration(
        contentPadding:
            const EdgeInsets.symmetric(vertical: 0.5, horizontal: 10.0),
        hintText: hintText,
        hintStyle: const TextStyle(color: Colors.black),
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
        createJson();
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

  Widget _backToLoginButton() {
  return TextButton(
    onPressed: () {
      Navigator.pop(context); // Navigate back to the previous screen (login page)
    },
    child: const Text(
      "Back to Login", // Change the button text to indicate going back to the login page
      style: TextStyle(
        color: Colors.white, // Change the text color
      ),
    ),
  );
}


  Widget _pageNameText() {
    return const Text(
      "Register",
      textAlign: TextAlign.center,
      style: TextStyle(fontSize: 24, color: Colors.white),
    );
  }
}

class ValidationPage extends StatefulWidget {
  const ValidationPage({super.key});

  @override
  State<ValidationPage> createState() => _ValidationPageState();
}

class _ValidationPageState extends State<ValidationPage> {
  final dataStorage = Storage();
  final validationCodeController = TextEditingController();
  bool showError = false;

  Future<void> _verifyEmail() async {
    final token = await dataStorage.getToken();
    if (token != null) {
      try {
        final response = await post(
          Uri.parse('${url}api/verify-email'),
          headers: <String, String>{
            'Authorization': token,
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(<String, String>{}),
        );
        // print(response.statusCode);
        if (response.statusCode == 200) {
          // Decodes JWT made token
          final responseData = jsonDecode(response.body);
          log(responseData['msg']);

          // Redirect to home page
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => HomePage()),
          );
        } else if (response.statusCode == 404) {
          log("User not found");
        }
      } catch (e) {
        log('Error: $e');
      }
    } else {
      log("Invalid token");
    }
  }

  Future<void> _deleteUser() async {
    final userId = await dataStorage.getUserId();
    
    if (userId != null) {
      Map map = {'userId': userId};
      var jason = jsonEncode(map);
      log("$jason");

      try {
        final response = await delete(
          Uri.parse('${url}api/delete-user'),
          headers: <String, String> {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: jason,
        );
        // print(response.statusCode);
        if (response.statusCode == 200) {
          // Decodes JWT made token
          final responseData = jsonDecode(response.body);
          log(responseData['message']);
        }
        else if (response.statusCode == 404) {
          log("User not found");
        }
        else if (response.statusCode == 500) {
          log("internal error");
        }
      } catch (e) {
        log('Error: $e');
      }
    } else {
      log("Invalid user ID");
    }
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
            begin: Alignment.topRight,
            end: Alignment.bottomLeft,
            colors: [
              Colors.black,
              Colors.yellow,
            ]),
      ),
      child: Scaffold(
        appBar: AppBar(
           automaticallyImplyLeading: false,
          iconTheme: const IconThemeData(color: Colors.white),
          backgroundColor: Colors.transparent,
          toolbarHeight: 35.0,
        ),
        backgroundColor: Colors.transparent,
        body: PopScope(
          onPopInvoked: (bool returnValue) async {
            log("deleting user");
            await _deleteUser();
          },
          child: _page(),
        ),
      ),
    );
  }

  Widget _page() {
    return Padding(
      padding: const EdgeInsets.all(32.0),
      child: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              //_icon(),
              //const SizedBox(height: 30,),
              _pageNameText(context),
              const SizedBox(
                height: 30,
              ),
              _inputField(context, validationCodeController),
              const SizedBox(
                height: 15,
              ),
              if (showError) _errorMsg(),
              const SizedBox(
                height: 15,
              ),
              _verifyButton(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _errorMsg() {
    return Text(
      "Incorrect code, try again",
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

  Widget _inputField(BuildContext context, TextEditingController controller) {
    return PinCodeTextField(
      appContext: context,
      length: 8,
      controller: controller,
      pinTheme: PinTheme(
        activeColor: Colors.black,
        selectedColor: Colors.yellow,
        inactiveColor: Colors.white,
      ),
    );
  }

  Widget _verifyButton() {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () async {
            String code = validationCodeController.text;
            if (await verifyCode(code)) {
              log("Verified");
              _verifyEmail();
            } else {
              log("verification failed");
              setState(() {
                showError = true;
              });
            }
          },
          child: const SizedBox(
            child: Text("Verify"),
          ),
        ),
      ],
    );
  }

  Widget _pageNameText(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'Enter the verification code sent to your email',
          style: TextStyle(
              fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 8),
        Text(
          'Check your spam folder if you can\'t find the email',
          style: TextStyle(
            fontSize: 14,
            color: Color.fromARGB(255, 226, 226, 226),
          ),
        ),
      ],
    );
  }

  Future<bool> verifyCode(String code) async {
    //get code from storage
    final storedCode = await dataStorage.getVerificationCode();
    if (storedCode != null) {
      log("provided code: $code");
      log("stored code $storedCode");
      if (code == storedCode) {
        log("verification success");
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
