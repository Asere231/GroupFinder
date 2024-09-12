import 'dart:convert';
import 'dart:ui';
import 'package:group_finder_mob/User-info.dart';
import 'package:group_finder_mob/first-floor.dart';
import 'package:group_finder_mob/second-floor.dart';
import 'package:group_finder_mob/storage.dart';
import 'package:group_finder_mob/third-floor.dart';
import 'package:http/http.dart';

import 'url.dart';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'forum_page.dart';
import 'study-groups.dart';

List<StudyGroup> _studyGroups = [
  StudyGroup(
    id: "",
    tableNum: "",
    title: "",
    subject: "",
    maxCapacity: 0,
    currCapacity: 0,
    usersAtTable: [""],
  ),
];

List<Post> _posts = [];

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  String get title => "All Knights Study";

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  Storage dataStorage = Storage();
  int _currentIndex = 0;
  late PageController _pageController;
  TextEditingController _searchController = TextEditingController();
  String _searchQuery = ''; // String to hold the search query

  String _selectedDropdownValue = 'Floor 1'; // Set an initial value of DropDown

// Initialization at the start of load
  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _transformationController = TransformationController();
    // Set an initial transformation (zoom level and position)
    _transformationController.value = Matrix4.identity()..scale(1.9);

    _getStudyGroups();
    _fetchPosts();
  }

// Release resoures when widget is removed
  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  late TransformationController _transformationController;

  @override
  Widget build(BuildContext context) {
    // Define the list of app bars for each page
    /*
    List<AppBar> appBars = [
      // Appbar for Floors Page
      AppBar(
        automaticallyImplyLeading: false,
        flexibleSpace: Padding(
          padding: const EdgeInsets.only(right: 30), // Adjust spacing as needed
          child: Row(
            children: [
              Image.asset(
                'images/AKS2.webp',
                width: 150,
                height: 300,
              ),
              const SizedBox(
                  width: 20), // Add spacing between logo and dropdown
              Expanded(
                child: DropdownButton<String>(
                  value: _selectedDropdownValue,
                  icon: const Icon(Icons.arrow_drop_down),
                  onChanged: (String? newValue) {
                    setState(() {
                      _selectedDropdownValue = newValue!;
                    });
                  },
                  items: <String>[
                    'Floor 1',
                    'Floor 2',
                    'Floor 3',
                  ].map<DropdownMenuItem<String>>((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        ),
      ),
      AppBar(
        automaticallyImplyLeading: false,
        // Customize the app bar for the Study Groups page
        flexibleSpace: Padding(
          padding: const EdgeInsets.only(right: 30, bottom: 60),
          child: Row(
            children: [
              Image.asset(
                'images/AKS2.webp',
                width: 100,
                height: 300,
              ),
            ],
          ),
        ),
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(80.0),
          child: Padding(
            padding: EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  flex: 2,
                  child: TextField(
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
                      border: OutlineInputBorder(),
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
                ),
              ],
            ),
          ),
        ),
      ),
      AppBar(
        // Customize the app bar for the Feed page
        automaticallyImplyLeading: false,
        flexibleSpace: Padding(
          padding: const EdgeInsets.only(
            right: 30,
          ),
          child: Row(
            children: [
              Image.asset(
                'images/AKS2.webp',
                width: 100,
                height: 300,
              ),
            ],
          ),
        ),
      ),
      AppBar(
        // Customize the app bar for the Settings page
        automaticallyImplyLeading: false,
        flexibleSpace: Padding(
          padding: const EdgeInsets.only(
            right: 30,
          ),
          child: Row(
            children: [
              Image.asset(
                'images/AKS2.webp',
                width: 100,
                height: 300,
              ),
            ],
          ),
        ),
      ),
    ];
    */

    return Scaffold(
      //appBar: appBars[_currentIndex], // Use the corresponding app bar for the current page
      body: PageView(
        controller: _pageController,
        physics: NeverScrollableScrollPhysics(), // Disable scrolling
        onPageChanged: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        children: [
          Container(
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
                      'Floors',
                      style: TextStyle(
                        color: Color(0xFFFFD700),
                      ),
                    ),
                    actions: [
                      DropdownButton<String>(
                        value: _selectedDropdownValue,
                        dropdownColor: Colors.black,
                        icon: const Icon(
                          Icons.arrow_drop_down,
                          color: Colors.white,
                        ),
                        onChanged: (String? newValue) {
                          setState(() {
                            _selectedDropdownValue = newValue!;
                          });
                        },
                        items: <String>[
                          'Floor 1',
                          'Floor 2',
                          'Floor 3',
                        ].map<DropdownMenuItem<String>>((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(
                              value,
                              style: const TextStyle(color: Colors.white),
                            ),
                          );
                        }).toList(),
                      ),
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
                      //padding: EdgeInsets.all(16.0),
                      decoration: BoxDecoration(
                        color:
                            Colors.black.withOpacity(0.7), //Color(0xFFF9F5B6),
                        //borderRadius: BorderRadius.circular(20),
                      ),
                      child: InteractiveViewer(
                        // Floors Page Container
                        transformationController: _transformationController,
                        boundaryMargin: const EdgeInsets.fromLTRB(200, 150, 80,
                            60), // How far the user can pan from the map image
                        minScale: 1.0,
                        maxScale: 4.0,
                        constrained: false,
                        alignment: Alignment.center,
                        clipBehavior: Clip.hardEdge,
                        child: _buildMapImage(),
                      )))),
          Container(
              child: StudyGroupPage(
                  studyGroups: _studyGroups)), // Study Groups Page Container
          Container(child: ForumPage(posts: _posts,)), // Feed Page Container
          UserInfo(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.black,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFFFFD700),
        unselectedItemColor: Colors.white,
        currentIndex: _currentIndex,
        onTap: (int index) {
          _pageController.animateToPage(
            index,
            duration: const Duration(milliseconds: 300),
            curve: Curves.ease,
          );
          
          //_pageController.jumpToPage(index);
        },
        iconSize: 28,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.stairs,
            ),
            label: 'Floors',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.book),
            label: 'Study Groups',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.forum),
            label: 'Forum',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle),
            label: 'Account',
          ),
        ],
      ),
    );
  }

  Widget _buildMapImage() {
    // Use a Map or a Switch statement to determine which image to display based on the selected floor
    switch (_selectedDropdownValue) {
      case 'Floor 1':
        return const FirstFloorMap();
      case 'Floor 2':
        return const SecondFloorMap();
      case 'Floor 3':
        return const ThirdFloorMap();
      default:
        return SizedBox(); // Return an empty container if no floor selected
    }
  }

  // On load displays all tables on Study Groups Page
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

        log("Study Groups fetched");
        setState(() {
          _studyGroups =
              fetchedStudyGroups; // Update the _studyGroups list with fetched data
        });
      } else {
        log('Failed to load data: ${response.statusCode}');
      }
    } catch (e) {
      log('Error: $e');
    }
  }

  Future<void> _fetchPosts() async {
    // Fetch posts from an API and update _posts list
    try {
      final response = await get(
        Uri.parse('${url}all-posts'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      // Handle the response based on its status code
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        List<Post> p = [];

        for (var element in data) {
          // print(element);
          String userId = element['user'];

          String username = element['username'];
          String title = element['title'];
          String content = element['postBody'];
          int likes = element['likes'];
          String postId = element['_id'];
          String tag = element['tag'];
          List<dynamic> commentsData = element['comments'];

          Post pt = Post(
            creatorUserId: userId,
            username: username,
            title: title,
            content: content,
            likes: likes,
            id: postId,
            tag: tag,
            comments: commentsData,
            // upvotes: element['upvotes'],
            // downvotes: element['downvotes'],
          );

          p.add(pt);
        }

        p = p.reversed.toList();

        // Now you can update the _posts list
        setState(() {
          _posts = p;
        });
      } else {
        log('Failed to load data: ${response.statusCode}');
      }
    } catch (e) {
      log('Error: $e');
    }
  }
}
