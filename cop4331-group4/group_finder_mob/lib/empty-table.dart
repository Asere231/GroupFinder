import 'dart:convert';
import 'dart:developer';
import 'package:group_finder_mob/storage.dart';
import 'package:flutter/material.dart';
import 'package:group_finder_mob/table-info.dart';
import 'package:http/http.dart';
import 'url.dart';
import 'home_page.dart';

class EmptyTable extends StatefulWidget {
  final int tableNum;
  const EmptyTable({super.key, required this.tableNum});

  @override
  State<EmptyTable> createState() => _EmptyTableState();
}

class _EmptyTableState extends State<EmptyTable> {
  final dataStorage = Storage();
  final titleController = TextEditingController();
  final subjectController = TextEditingController();
  final maxCapController = TextEditingController();
  Color requirementColor = Colors.white;
  bool showError = false;

  @override
  Widget build(BuildContext context) {
    if (showError) {
      requirementColor = const Color.fromARGB(255, 182, 37, 37);
    }

    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('images/BackgroundUCF.webp'),
          fit: BoxFit.cover,
        ),
      ),
      child: Scaffold(
        appBar: AppBar(
          iconTheme: const IconThemeData(color: Colors.white),
          backgroundColor: Colors.black.withOpacity(0.7),
          toolbarHeight: 35.0,
        ),
        backgroundColor: Colors.transparent,
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
                height: 10,
              ),
              if(showError) _errorMsg(),
              const SizedBox(
                height: 25,
              ),
              _inputField("Title", titleController),
              Text(
                "Minimum of 5 letters",
                textAlign: TextAlign.left,
                style: TextStyle(
                  color: requirementColor,
                  shadows: const [
                    Shadow(
                      color: Colors.black, // Subtle black shadow
                      offset: Offset(1, 1), // Shadow offset
                      //blurRadius: 0.5, // Shadow blur radius
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              _inputField("Subject", subjectController),
              Text(
                "Minimum of 3 letters",
                textAlign: TextAlign.left,
                style: TextStyle(
                  color: requirementColor,
                  shadows: const [
                    Shadow(
                      color: Colors.black, // Subtle black shadow
                      offset: Offset(1, 1), // Shadow offset
                      //blurRadius: 0.5, // Shadow blur radius
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              _inputField("Max Capacity", maxCapController, numKeys: true),
              Text(
                "Must be a number",
                textAlign: TextAlign.left,
                style: TextStyle(
                  color: requirementColor,
                  shadows: const [
                    Shadow(
                      color: Colors.black, // Subtle black shadow
                      offset: Offset(1, 1), // Shadow offset
                      //blurRadius: 0.5, // Shadow blur radius
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 20,
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

  Widget _errorMsg() {
    return const Text(
      "There was a problem creating your table\nPlease make sure requirments were met",
      textAlign: TextAlign.center,
      style: TextStyle(
        color: Color.fromARGB(255, 182, 37, 37),
        fontSize: 15.0,
        fontWeight: FontWeight.bold,
        shadows: [
          Shadow(
            color: Colors.black, // Subtle black shadow
            offset: Offset(1, 1), // Shadow offset
            //blurRadius: 0.5, // Shadow blur radius
          ),
        ],
      ),
    );
  }

  Widget _inputField(String hintText, TextEditingController controller,
      {isPassword = false, bool numKeys = false}) {
    var border = OutlineInputBorder(
      borderRadius: BorderRadius.circular(18),
      borderSide: BorderSide(color: requirementColor),
    );
    return TextField(
      style: const TextStyle(color: Colors.white),
      controller: controller,
      keyboardType: numKeys ? TextInputType.number : TextInputType.text,
      decoration: InputDecoration(
        contentPadding:
            const EdgeInsets.symmetric(vertical: 0.5, horizontal: 10.0),
        hintText: hintText,
        hintStyle: const TextStyle(color: Colors.white),
        enabledBorder: border,
        focusedBorder: border,
      ),
      obscureText: isPassword,
    );
  }

  Widget _createButton() {
    return ElevatedButton(
      onPressed: () {
        createJson();
      },
      child: const SizedBox(
        child: Text("Create Table"),
      ),
    );
  }

  Widget _pageNameText() {
    return Text(
      "Create a new table for table: ${widget.tableNum}",
      textAlign: TextAlign.center,
      style: const TextStyle(fontSize: 24, color: Colors.white),
    );
  }

  Future<void> createJson() async {
    final userId = await dataStorage.getUserId();
    final username = await dataStorage.getUsername();
    final maxCapacity = int.tryParse(maxCapController.text) ?? 0;
    Map map = {
      'tableNum': widget.tableNum,
      'title': titleController.text,
      'subject': subjectController.text,
      'currCapacity': 1,
      'maxCapacity': maxCapacity,
      'userId': userId,
      'username': username,
    };

    var jason = jsonEncode(map);
    log(jason);
    _postData(jason);
  }

  Future<void> _postData(json) async {
    try {
      final response = await post(Uri.parse('${url}api/tables'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: json);
      log('${response.statusCode}');
      if (response.statusCode == 200) {
        log("good response");
        // Decodes JWT made token
        final responseData = jsonDecode(response.body);
        final message = responseData['msg'];
        final tableNum = responseData['tableNum'];
        log('$message');
        dataStorage.storeCurTable(tableNum);

        // Redirect to home page

        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => TableInfo(
                    tableJson: responseData,
                  )),
        );
      } else {
        //final responseData = jsonDecode(response.body);
        log(response.body);
        setState(() {
          showError = true;
        });
      }
    } catch (e) {
      log('Error: $e');
    }
  }
}
