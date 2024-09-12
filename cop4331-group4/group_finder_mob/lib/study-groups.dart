import 'dart:convert';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'table-info.dart';
import 'url.dart';

class StudyGroup {
  final String id;
  final String tableNum;
  final String title;
  final String subject;
  final int maxCapacity;
  final int currCapacity;
  final List<String> usersAtTable;

  StudyGroup({
    required this.id,
    required this.tableNum,
    required this.title,
    required this.subject,
    required this.maxCapacity,
    required this.currCapacity,
    required this.usersAtTable,
  });

  @override
  String toString() {
    return "Table: $tableNum";
  }
}

class StudyGroupPage extends StatefulWidget {
  List<StudyGroup> studyGroups;
  StudyGroupPage({super.key, required this.studyGroups});

  @override
  State<StudyGroupPage> createState() => _StudyGroupPageState();
}

class _StudyGroupPageState extends State<StudyGroupPage> {
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';

  

  @override
  Widget build(BuildContext context) {
    Widget child = widget.studyGroups.isNotEmpty
        ? ListView.builder(
            itemCount: widget.studyGroups.length,
            itemBuilder: (BuildContext context, int index) {
              StudyGroup group = widget.studyGroups[index];
              return Card(
                elevation: 3.0,
                color: Color(0xFFF9F5B6),
                child: Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        group.title,
                        style: const TextStyle(
                          fontSize: 20.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        'Table Number: ${group.tableNum}',
                        style: const TextStyle(fontSize: 16.0),
                      ),
                      const SizedBox(height: 5.0),
                      Text(
                        'Subject: ${group.subject}',
                        style: const TextStyle(fontSize: 16.0),
                      ),
                      const SizedBox(height: 5.0),
                      Text(
                        'Current Capacity: ${group.currCapacity}/${group.maxCapacity}',
                        style: const TextStyle(fontSize: 16.0),
                      ),
                      const SizedBox(height: 10.0),
                      ElevatedButton(
                        onPressed: () {
                          dynamic mappedGroup = mapStudyGroup(group);
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>
                                  TableInfo(tableJson: mappedGroup),
                            ),
                          );
                        },
                        child: const Text(
                          'Join Group',
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          )
        : const Center(
            child: Card(
              elevation: 3.0,
              color: Color(0xFFFFD700),
              child: Padding(
                padding: EdgeInsets.all(15.0),
                child: Text(
                  'No Tables Found',
                  style: TextStyle(
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          );

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
              title: const Text(
                'Study Groups',
                style: TextStyle(
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
              shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(10),
                    bottomRight: Radius.circular(10)),
              ),
              backgroundColor: Colors.black,
            ),
            body: Container(
              // Account Page Container
              padding: EdgeInsets.all(8.0),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.7), //Color(0xFFF9F5B6),
                //borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                children: [
                  TextField(
                    controller: _searchController,
                    onChanged: (value) {
                      setState(() {
                        _searchQuery = value;
                        _getStudyGroupsByKey(value);
                      });
                    },
                    style: const TextStyle(
                      color: Color(0xFFFFD700),
                    ),
                    cursorColor: Color(0xFFFFD700),
                    decoration: const InputDecoration(
                      hintText: 'Search for Study Groups',
                      border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(10))),
                      filled: true,
                      fillColor: Colors.black,
                      hintStyle: TextStyle(
                        color: Color(0xFFFFD700),
                      ),
                      suffixIcon: Icon(
                        Icons.search,
                        color: Color(0xFFFFD700),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10, height: 8,),
                  Expanded(child: RefreshIndicator(color: Color(0xFFFFD700), onRefresh: _getStudyGroups, child: child))
                  
                  
                ],
              ),
            )));
  }

  Map<String, dynamic> mapStudyGroup(StudyGroup group) {
    Map<String, dynamic> map;
    map = Map.of({
      'tableNum': group.tableNum,
      'title': group.title,
      'subject': group.subject,
      'maxCapacity': group.maxCapacity,
      'currCapacity': group.currCapacity,
      'usersAtTable': group.usersAtTable
    });

    return map;
  }

  Future<void> _getStudyGroupsByKey(String key) async {
    try {
      // Once the search bar is cleared, print all study groups
      if (key == '') {
        _getStudyGroups();
      } else {
        final response = await get(
          Uri.parse('${url}api/search/' + key),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
        );

        // Handle the response based on its status code
        if (response.statusCode == 200) {
          final responseData = jsonDecode(response.body);
          final List<dynamic> tableData = responseData as List<dynamic>;

          List<StudyGroup> fetchedStudyGroups =
              []; // Create a temporary list to hold fetched study groups

          for (var item in tableData) {
            // Extract data from the response and create StudyGroup objects
            StudyGroup studyGroup = StudyGroup(
              id: item['_id'],
              tableNum: item['tableNum'],
              title: item['title'],
              subject: item['subject'],
              maxCapacity: item['maxCapacity'],
              currCapacity: item['currCapacity'],
              usersAtTable: List<String>.from(item['usersAtTable']),
            );
            fetchedStudyGroups
                .add(studyGroup); // Add the study group to the temporary list
          }

          setState(() {
            widget.studyGroups =
                fetchedStudyGroups; // Update the _studyGroups list with fetched data
          });

          // Logging the study groups
          for (var studyGroup in fetchedStudyGroups) {
            log('Study Group: ${studyGroup.title}');
          }

          // No Tables found with key
        } else {
          List<StudyGroup> fetchedStudyGroups = [];

          setState(() {
            widget.studyGroups =
                fetchedStudyGroups; // Update the _studyGroups list with fetched data
          });
          log('Failed to load data here: ${response.statusCode}');
        }
      }
    } catch (e) {
      log('Error: $e');
    }
  }

  Future<void> _getStudyGroups() async {
    try {
      final response = await get(
        Uri.parse('${url}api/all-tables'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      // Handle the response based on its status code
      if (response.statusCode == 200) {
        //log(response.body);
        final responseData = jsonDecode(response.body);
        final List<dynamic> tableData = responseData as List<dynamic>;

        List<StudyGroup> fetchedStudyGroups =
            []; // Create a temporary list to hold fetched study groups

        for (var item in tableData) {
          // Extract data from the response and create StudyGroup objects
          StudyGroup studyGroup = StudyGroup(
            id: item['_id'],
            tableNum: item['tableNum'],
            title: item['title'],
            subject: item['subject'],
            maxCapacity: item['maxCapacity'],
            currCapacity: item['currCapacity'],
            usersAtTable: List<String>.from(item['usersAtTable']),
          );
          fetchedStudyGroups
              .add(studyGroup); // Add the study group to the temporary list
        }

        log("Study groups fetched");
        log(fetchedStudyGroups.toString());
        setState(() {
          widget.studyGroups =
              fetchedStudyGroups; // Update the _studyGroups list with fetched data
        });
      } else {
        log('Failed to load data: ${response.statusCode}');
      }
    } catch (e) {
      log('Error: $e');
    }
  }
}
