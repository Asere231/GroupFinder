import 'dart:convert';
import 'dart:developer';
import 'dart:io';

import 'package:group_finder_mob/empty-table.dart';
import 'package:group_finder_mob/table-info.dart';
import 'package:group_finder_mob/test-table.dart';

import 'url.dart';
import 'login_page.dart';
import 'home_page.dart';
import 'register_page.dart';
import 'test-table.dart';

import 'package:flutter/material.dart';
import 'package:http/http.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
          splashColor: Colors.transparent,
          highlightColor: Colors.transparent,
          hoverColor: Colors.transparent,
          elevatedButtonTheme: const ElevatedButtonThemeData(
              style: ButtonStyle(
                  foregroundColor: MaterialStatePropertyAll(Colors.black))),
          textSelectionTheme: const TextSelectionThemeData(
            cursorColor: Colors.grey,
            selectionColor: Color.fromARGB(255, 102, 102, 102),
            selectionHandleColor: Color(0xFFF9F5B6),
          )),
      home: LoginPage(),
      //home: const RegisterPage(),
      //home: LoginPage(),
      //home: HomePage(),
    );
  }
}
