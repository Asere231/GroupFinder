import 'dart:convert';
import 'dart:developer';
import 'package:group_finder_mob/storage.dart';
import 'package:flutter/material.dart';
import 'package:group_finder_mob/table-info.dart';
import 'package:http/http.dart';
import 'url.dart';
import 'home_page.dart';

class TableUpdate extends StatefulWidget {
  dynamic tableJson;
  TableUpdate({super.key, required this.tableJson});

  @override
  State<TableUpdate> createState() => _TableUpdateState();
}

class _TableUpdateState extends State<TableUpdate> {
  final dataStorage = Storage();
  final titleController = TextEditingController();
  final subjectController = TextEditingController();
  final maxCapController = TextEditingController();

  Color requirementColor = Colors.white;
  bool showError = false;

  @override
  Widget build(BuildContext context) {
    if (showError) {
      requirementColor = Color.fromARGB(255, 182, 37, 37);
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
                height: 5,
              ),
              if (showError) _errorMsg(),
              const SizedBox(
                height: 15,
              ),
              _inputField("title", titleController),
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
              _inputField("subject", subjectController),
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
              _inputField("maxCapacity", maxCapController, numKeys: true),
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
                height: 25,
              ),
              _createButton(),
              const SizedBox(
                height: 5,
              ),
              _deleteButton(),
              //_extraText(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _errorMsg() {
    return const Text(
      "There was a problem updating your table\nPlease make sure requirments were met",
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

  Widget _inputField(String field, TextEditingController controller,
      {isPassword = false, bool numKeys = false}) {
    controller.text = widget.tableJson[field].toString();
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
        child: Text(
          "Update Table",
          style: TextStyle(color: Colors.black),
        ),
      ),
    );
  }

  Widget _deleteButton() {
    return ElevatedButton(
      onPressed: () {
        _deleteTable();
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.red,
      ),
      child: const SizedBox(
        child: Text(
          "Delete Table",
          style: TextStyle(color: Colors.black),
        ),
      ),
    );
  }

  Widget _pageNameText() {
    return const Text(
      "Update table information",
      textAlign: TextAlign.center,
      style: TextStyle(fontSize: 24, color: Colors.white),
    );
  }

  Future<void> createJson() async {
    final maxCapacity = int.tryParse(maxCapController.text) ?? 0;
    Map map = {
      'tableNum': widget.tableJson['tableNum'],
      'title': titleController.text,
      'subject': subjectController.text,
      'currCapacity': widget.tableJson['currCapacity'],
      'maxCapacity': maxCapacity,
    };

    var jason = jsonEncode(map);
    log(jason);
    _postData(jason);
  }

  Future<void> _postData(json) async {
    try {
      final response = await patch(Uri.parse('${url}api/table-edit'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: json);
      log('${response.statusCode}');
      if (response.statusCode == 200) {
        log("good response");
        // Decodes JWT made token
        final responseData = jsonDecode(response.body);

        // Redirect to home page

        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => TableInfo(
                    tableJson: responseData,
                  )),
        );
      } else {
        log(jsonDecode(response.body)['error']);
      }
    } catch (e) {
      log('Error: $e');
    }
  }

  Future<void> _deleteTable() async {
    Map tableNum = {'tableNum': widget.tableJson['tableNum']};

    var jason = jsonEncode(tableNum);

    try {
      final response = await delete(Uri.parse('${url}api/delete-table'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jason);
      log('${response.statusCode}');
      if (response.statusCode == 200) {
        log("good response");
        // Decodes JWT made token
        final responseData = jsonDecode(response.body);
        log(responseData.toString());
        // Redirect to home page

        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const HomePage()),
        );
      } else {
        log(jsonDecode(response.body)['error']);
      }
    } catch (e) {
      log('Error: $e');
    }
  }
}
