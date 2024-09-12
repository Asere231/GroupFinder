import 'dart:convert';
import 'dart:developer';
import 'package:group_finder_mob/storage.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'table-info.dart';
import 'url.dart';
import 'home_page.dart';

class TestTable extends StatefulWidget {
  TestTable({super.key});

  @override
  State<TestTable> createState() => _TestTableState();
}

class _TestTableState extends State<TestTable> {
  final dataStorage = Storage();

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
          iconTheme: const IconThemeData(color: Colors.white),
          backgroundColor: Colors.transparent,
          toolbarHeight: 35.0,
        ),
        backgroundColor: Colors.transparent,
        body: const Center(
          child: CircularProgressIndicator(color: Colors.yellow,),
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
              const SizedBox(
                height: 30,
              ),
              _pageNameText(),
              const SizedBox(
                height: 5,
              ),
              const SizedBox(
                height: 15,
              ),
              //_tableText('Table Number'),
              //_inputField("Title", titleController),
              const SizedBox(
                height: 25,
              ),
              //_inputField("Subject", subjectController),
              const SizedBox(
                height: 25,
              ),
              //_inputField("Max Capacity", maxCapController, numKeys: true),
              const SizedBox(
                height: 25,
              ),
              _createButton(),
              const SizedBox(
                height: 20,
              ),
              //_extraText(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _createButton() {
    return ElevatedButton(
      onPressed: () {
        log("pressed");
        pressed();
      },
      child: const SizedBox(
        child: Text("Create Table"),
      ),
    );
  }

  Widget _pageNameText() {
    return const Text(
      "Create a new table",
      textAlign: TextAlign.center,
      style: TextStyle(fontSize: 24, color: Colors.white),
    );
  }

  Future<dynamic> _postData() async {
    Map map = {'tableNum': 118};
    var jason = jsonEncode(map);
    try {
      final response = await post(Uri.parse('${url}api/find-table'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jason);
      log('${response.statusCode}');
      if (response.statusCode == 200) {
        log("good response");
        // Decodes JWT made token
        final responseData = jsonDecode(response.body);
        log(response.body);

        // Redirect to home page
        return responseData;
      } else {
        log(jsonDecode(response.body)['error']);
      }
    } catch (e) {
      log('Error: $e');
    }
  }

  Future<void> pressed() async {
    dynamic tableJson;
    tableJson = await _postData();
    //log(tableJson.toString());
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => TableInfo(tableJson: tableJson)));
  }
}
