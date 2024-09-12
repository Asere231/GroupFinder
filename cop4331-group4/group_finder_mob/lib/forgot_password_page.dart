import 'dart:convert';
import 'dart:developer';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:group_finder_mob/login_page.dart';
import 'package:group_finder_mob/storage.dart';
import 'package:pin_code_fields/pin_code_fields.dart';
import 'package:flutter/material.dart';
import 'url.dart';
import 'home_page.dart';
import 'package:http/http.dart';
import 'package:group_finder_mob/register_page.dart';

final usernameController = TextEditingController();
final passwordController = TextEditingController();
String verificationCode = "";
bool showVerifyPage = false;
bool showChangePasswordPage = false; 




class ForgotPasswordPage extends StatelessWidget {
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
        body: ValidationPage(),
      ),
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

  @override
  void initState() {
    super.initState();
    resetState(); // Call resetState() in initState
  }

  @override
  void dispose() {
    validationCodeController.dispose();
    super.dispose();
  }

  void resetState() {
    verificationCode = '';
    showVerifyPage = false;
    showChangePasswordPage = false;
    validationCodeController.clear();
    showError = false;
  }

  Future<bool> verifyCode(String code) async {
    //get code from storage
    final storedCode = verificationCode;
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

  Widget _verifyButton() {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () async {
            String code = validationCodeController.text;
            if (await verifyCode(code)) {
              log("Verified");
              setState(() {
                showVerifyPage = true;
                showChangePasswordPage = true; // Set to true after successful verification
              });
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

  Widget _sendButton() {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () async {
            createJson();
          },
          child: const SizedBox(
            child: Text("Submit"),
          ),
        ),
      ],
    );
  }

  Widget _backButton() {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () async {
            setState(() {
          showVerifyPage = false;
          showError = false;
          usernameController.text = "";
          passwordController.text = "";
        });
            Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => LoginPage()),
        );
          },
          child: const SizedBox(
            child: Text("Back To Login"),
          ),
        ),
      ],
    );
  }

  Widget _sendPasswordButton() {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () async {
            createPasswordJson();
          },
          child: const SizedBox(
            child: Text("Submit"),
          ),
        ),
      ],
    );
  }

  void createJson() {
    Map map = {
      'username': usernameController.text,
    };

    _postData(map);
  }

  void createPasswordJson() {
    Map map = {
      'username': usernameController.text,
      'password': passwordController.text,
    };

    _postPasswordData(map);
  }

  Future<void> _postPasswordData(Map json) async {
    var jsonData = jsonEncode(json);
    try {
      final response = await post(
        Uri.parse('${url}api/change-password'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonData,
      );

      // Handle the response based on its status code
      if (response.statusCode == 200) {

        setState(() {
          showVerifyPage = false;
          showError = false;
          usernameController.text = "";
          passwordController.text = "";
        });
      Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => LoginPage()),
        );
      } else {
        final responseData = jsonDecode(response.body);
        log('Response status code: ${response.statusCode}');
        log('Response body: $responseData');
        setState(() {
          showError = true;
        });
      }
    } catch (e) {
      log('Error: $e');
    }
  }

  Future<void> _postData(Map json) async {
    var jsonData = jsonEncode(json);
    try {
      final response = await post(
        Uri.parse('${url}api/forgot-password'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonData,
      );

      // Handle the response based on its status code
      if (response.statusCode == 200) {
        // Decodes JWT made token
        final responseData = jsonDecode(response.body);
        verificationCode = responseData['verificationCode'] as String;
        log('Verification Code: $verificationCode');
        setState(() {
          showVerifyPage = true;
          showError = false;
        });
      } else {
        final responseData = jsonDecode(response.body);
        log('Response status code: ${response.statusCode}');
        log('Response body: $responseData');
        setState(() {
          showError = true;
        });
      }
    } catch (e) {
      log('Error: $e');
    }
  }

  Widget _Verifypage() {
    return Padding(
      padding: const EdgeInsets.all(32.0),
      child: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _VerifyText(context),
              const SizedBox(
                height: 30,
              ),
              _VerifyInputField(context, validationCodeController),
              const SizedBox(
                height: 15,
              ),
              if (showError) _errorMsg(),
              const SizedBox(
                height: 15,
              ),
              _backButton(),
              _verifyButton(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _ForgotPasswordpage() {
    return Padding(
      padding: const EdgeInsets.all(32.0),
      child: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _UsernameText(context),
              const SizedBox(
                height: 30,
              ),
              _UsernameInputField("Username", usernameController),
              const SizedBox(
                height: 15,
              ),
              if (showError) _errorUserMsg(),
              const SizedBox(
                height: 15,
              ),
              _backButton(),
              _sendButton(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _changePasswordpage() {
    return Padding(
      padding: const EdgeInsets.all(32.0),
      child: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _PasswordText(context),
              const SizedBox(
                height: 30,
              ),
              _PasswordInputField("Password", passwordController,obscureText: true),
              const SizedBox(
                height: 15,
              ),
              if (showError) _errorPassMsg(),
              const SizedBox(
                height: 15,
              ),
              _backButton(),
              _sendPasswordButton(), 
            ],
          ),
        ),
      ),
    );
  }

  Widget _VerifyText(BuildContext context) {
  return const Column(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      Text(
        'Enter the verification code sent to your email',
        style: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          color: Colors.white, // Set text color to white
        ),
        textAlign: TextAlign.center,
      ),
      SizedBox(height: 8),
      Text(
        'Check your spam folder if you can\'t find the email',
        style: TextStyle(
          fontSize: 14,
          color: Colors.white, // Set text color to white
        ),
      ),
    ],
  );
}


  Widget _UsernameText(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'Enter your Username to reset your password',
          style: TextStyle(
              fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

   Widget _PasswordText(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'Now enter your new Password',
          style: TextStyle(
              fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _VerifyInputField(BuildContext context, TextEditingController controller) {
  return TextField(
    controller: controller,
    maxLength: 8, // Set the maximum length to 8 characters
    style: const TextStyle(
      color: Colors.white, // Set the text color to white
      fontSize: 24, // Adjust the font size as needed
    ),
    decoration: const InputDecoration(
      counterStyle: TextStyle(color: Colors.transparent), // Hide the character counter
      enabledBorder: UnderlineInputBorder(
        borderSide: BorderSide(color: Colors.white), // Set the underline color to white
      ),
      focusedBorder: UnderlineInputBorder(
        borderSide: BorderSide(color: Colors.white), // Set the focused underline color to white
      ),
    ),
    textAlign: TextAlign.center, // Align the text in the center
  );
}

  Widget _UsernameInputField(String hintText, TextEditingController controller,
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

 Widget _PasswordInputField(String hintText, TextEditingController controller, {bool obscureText = false}) {
  var border = OutlineInputBorder(
    borderRadius: BorderRadius.circular(10),
    borderSide: const BorderSide(color: Color(0xFFFFD700)),
  );
  return TextField(
    style: TextStyle(color: Colors.white), // Set the text color to white
    controller: controller,
    obscureText: obscureText, // Hide the input characters
    obscuringCharacter: '•', // Use the bullet character to obscure the input
    decoration: InputDecoration(
      contentPadding: const EdgeInsets.symmetric(vertical: 0.5, horizontal: 10.0),
      hintText: hintText,
      hintStyle: TextStyle(color: Colors.grey), // Set the hint text color
      enabledBorder: border,
      focusedBorder: border,
      filled: true,
      fillColor: Colors.transparent, // Set the background color to transparent
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
            color: Colors.black.withOpacity(0.5),
            offset: const Offset(1, 1),
            blurRadius: 1,
          ),
        ],
      ),
    );
  }

  Widget _errorUserMsg() {
    return Text(
      "User not found",
      textAlign: TextAlign.center,
      style: TextStyle(
        color: Colors.red[900],
        fontSize: 18.0,
        fontWeight: FontWeight.bold,
        shadows: [
          Shadow(
            color: Colors.black.withOpacity(0.5),
            offset: const Offset(1, 1),
            blurRadius: 1,
          ),
        ],
      ),
    );
  }

  Widget _errorPassMsg() {
    return Text(
      "Error updating password",
      textAlign: TextAlign.center,
      style: TextStyle(
        color: Colors.red[900],
        fontSize: 18.0,
        fontWeight: FontWeight.bold,
        shadows: [
          Shadow(
            color: Colors.black.withOpacity(0.5),
            offset: const Offset(1, 1),
            blurRadius: 1,
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('images/BackgroundUCF.webp'),
          fit: BoxFit.cover,
          colorFilter: ColorFilter.mode(
            Colors.black.withOpacity(0.8),
            BlendMode.darken,
          ),
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: showVerifyPage
            ? (showChangePasswordPage ? _changePasswordpage() : _Verifypage())
            : _ForgotPasswordpage(),
      ),
    );
  }
}
