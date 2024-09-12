import 'dart:convert';
import 'dart:developer';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:group_finder_mob/storage.dart';
import 'package:http/http.dart';

import 'url.dart';

class UserInfo extends StatefulWidget {
  const UserInfo({super.key});

  @override
  State<UserInfo> createState() => _UserInfoState();
}

class _UserInfoState extends State<UserInfo> {
  final dataStorage = Storage();
  TextEditingController usernameController = TextEditingController();
  TextEditingController firstNameController = TextEditingController();
  TextEditingController lastNameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  bool enableFields = false;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: getUserInfo(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const SizedBox.shrink();
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else {
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
                  automaticallyImplyLeading: false,
                  title: Text(
                    'Welcome, ${firstNameController.text}',
                    style: const TextStyle(
                      color: Color(0xFFFFD700),
                    ),
                  ),
                  actions: [
                    Padding(
                      padding: const EdgeInsets.all(0),
                      child: Image.asset(
                        'images/AKS2.webp',
                        width: 100,
                        height: 50,
                      ),
                    )
                  ],
                  backgroundColor: Colors.black,
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(10),
                        bottomRight: Radius.circular(10)),
                  ),
                ),
                body: Container(
                    // Account Page Container
                    padding: EdgeInsets.all(16.0),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.7), //Color(0xFFF9F5B6),
                      //borderRadius: BorderRadius.circular(20),
                    ),
                    child: _page()),
              ),
            );
          }
        });
  }

  Widget _page() {
    Color fontColor = Colors.white;

    InputBorder enabledBorder = OutlineInputBorder(
        borderSide: const BorderSide(color: Color(0xFFFFD700)),
        borderRadius: BorderRadius.circular(10));
    OutlineInputBorder disabledBorder = OutlineInputBorder(
      borderSide: BorderSide.none,
      borderRadius: BorderRadius.circular(10),
    );

    RichText enabledEditingTitle = RichText(
        text: TextSpan(
            text: 'Update Account:',
            style: TextStyle(color: fontColor, fontSize: 22)));
    RichText disabledEditingTitle = RichText(
        text: TextSpan(
            text: 'Account Information:',
            style: TextStyle(color: fontColor, fontSize: 22)));

    return Padding(
        padding: EdgeInsets.all(32),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (enableFields) enabledEditingTitle else disabledEditingTitle,
                const SizedBox(
                  width: 20,
                  height: 50,
                ),
                TextField(
                  controller: firstNameController,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: fontColor,
                    fontSize: 22,
                  ),
                  decoration: InputDecoration(
                      contentPadding: const EdgeInsets.symmetric(
                          vertical: 0.5, horizontal: 10.0),
                      prefixText: 'First Name: ',
                      prefixStyle: TextStyle(color: fontColor, fontSize: 22),
                      enabledBorder: enabledBorder,
                      disabledBorder: disabledBorder,
                      fillColor: Colors.black.withOpacity(1),
                      filled: false),
                  enabled: enableFields,
                ),
                const SizedBox(
                  width: 20,
                  height: 20,
                ),
                TextField(
                  controller: lastNameController,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: fontColor,
                    fontSize: 22,
                  ),
                  decoration: InputDecoration(
                      contentPadding: const EdgeInsets.symmetric(
                          vertical: 0.5, horizontal: 10.0),
                      prefixText: 'Last Name: ',
                      prefixStyle: TextStyle(color: fontColor, fontSize: 22),
                      enabledBorder: enabledBorder,
                      disabledBorder: disabledBorder),
                  enabled: enableFields,
                ),
                if (!enableFields)
                  const SizedBox(
                    width: 20,
                    height: 20,
                  ),
                if (!enableFields)
                  TextField(
                    controller: usernameController,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: fontColor,
                      fontSize: 22,
                    ),
                    decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(
                            vertical: 0.5, horizontal: 10.0),
                        prefixText: 'Username: ',
                        prefixStyle: TextStyle(color: fontColor, fontSize: 22),
                        enabledBorder: enabledBorder,
                        disabledBorder: disabledBorder),
                    enabled: enableFields,
                  ),
                const SizedBox(
                  width: 20,
                  height: 20,
                ),
                TextField(
                  controller: passwordController,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: fontColor,
                    fontSize: 22,
                  ),
                  decoration: InputDecoration(
                      contentPadding: const EdgeInsets.symmetric(
                          vertical: 0.5, horizontal: 10.0),
                      prefixText: 'Password: ',
                      prefixStyle: TextStyle(color: fontColor, fontSize: 22),
                      enabledBorder: enabledBorder,
                      disabledBorder: disabledBorder),
                  enabled: enableFields,
                  obscureText: true,
                ),
                const SizedBox(
                  width: 20,
                  height: 20,
                ),
                if (enableFields)
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          createJson();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          minimumSize: const Size(120, 50),
                        ),
                        child: const Text(
                          'Update Account',
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                      ),
                      const SizedBox(
                        width: 20,
                        height: 10,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          deleteButtonFunc();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red,
                          minimumSize: const Size(120, 50),
                        ),
                        child: const Text(
                          'Delete Account',
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                      ),
                    ],
                  )
                else
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            enableFields = true;
                          });
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          minimumSize: const Size(100, 50),
                        ),
                        child: const Text(
                          'Update Account',
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          dataStorage.logout();
                          Navigator.of(context)
                              .popUntil((route) => route.isFirst);
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red,
                          minimumSize: const Size(100, 50),
                        ),
                        child: const Text(
                          'LOGOUT',
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                      ),
                    ],
                  )
              ],
            ),
          ),
        ));
  }

  Future<void> getUserInfo() async {
    String? firstName = await dataStorage.getFirstName();
    String? lastName = await dataStorage.getLastName();
    String? username = await dataStorage.getUsername();
    String? password = await dataStorage.getPassword();

    if (firstName != null &&
        lastName != null &&
        username != null &&
        password != null) {
      firstNameController.text = firstName;
      lastNameController.text = lastName;
      usernameController.text = username;
      passwordController.text = password;
    }
  }

  void createJson() {
    Map map = {
      'firstName': firstNameController.text,
      'lastName': lastNameController.text,
      'password': passwordController.text,
    };

    _updateUser(map);
  }

  Future<void> _updateUser(Map json) async {
    var jason = jsonEncode(json);
    var token = await dataStorage.getToken();
    if (token != null) {
      try {
        final response = await patch(Uri.parse('${url}api/user-edit'),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': token,
            },
            body: jason);
        // print(response.statusCode);
        if (response.statusCode == 200) {
          log("good response");
          // Decodes JWT made token
          final responseData = jsonDecode(response.body);

          log(responseData.toString());
          await dataStorage.storeUserUpdates(responseData);
          await dataStorage.storePassword(json['password']);

          setState(() {
            enableFields = false;
          });

          // Redirect to home page
        } else if (response.statusCode == 400) {
          log("reponse code: 400");
          log(jsonDecode(response.body)['error']);
          setState(() {});
        }
      } catch (e) {
        log('Error: $e');
      }
    }
  }

  void deleteButtonFunc() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.black,
          title: const Text(
            "Delete Account",
            style: TextStyle(color: Colors.white),
          ),
          content: const Text(
            "Are you sure you want to delete your account?",
            style: TextStyle(color: Colors.white, fontSize: 16),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: const Text(
                "Cancel",
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
            ),
            TextButton(
              onPressed: () {
                _deleteUser();
                Navigator.of(context).pop(); // Close the dialog
              },
              child: const Text(
                "Delete",
                style: TextStyle(
                  color: Colors.red,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  Future<void> _deleteUser() async {
    String? userId = await dataStorage.getUserId();

    String jason = jsonEncode({'userId': userId});

    if (userId != null) {
      try {
        final response = await patch(Uri.parse('${url}api/user-edit'),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: jason);
        // print(response.statusCode);
        if (response.statusCode == 200) {
          log("good response");
          // Decodes JWT made token
          final responseData = jsonDecode(response.body);

          log(responseData.toString());

          dataStorage.logout();
          Navigator.of(context).popUntil((route) => route.isFirst);

          // Redirect to home page
        } else if (response.statusCode == 400) {
          log("reponse code: 400");
          log(jsonDecode(response.body)['error']);
          setState(() {});
        }
      } catch (e) {
        log('Error: $e');
      }
    }
  }
}
