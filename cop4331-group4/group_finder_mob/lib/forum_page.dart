import 'dart:async';
import 'dart:convert';
import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';
import 'package:http/http.dart';

import 'url.dart';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:group_finder_mob/storage.dart';

class ForumPage extends StatefulWidget {
  List<Post> posts = [];
  ForumPage({super.key, required this.posts});

  @override
  _ForumPageState createState() => _ForumPageState();
}

class _ForumPageState extends State<ForumPage> {
  TextEditingController _titleController = TextEditingController();
  TextEditingController _contentController = TextEditingController();
  final dataStorage = Storage();
  String? _userId;

  @override
  void initState() {
    super.initState();
    log("Initializing ForumPage");
    _initializeState();
  }

  Future<void> _initializeState() async {
    await _retrieveUserId();
    //_fetchPosts();

    // Now _userId is set after _retrieveUserId() completes
    log("userId: $_userId");
  }

  Future<void> _retrieveUserId() async {
    String? userId = await dataStorage.getUserId();
    if (userId != null) {
      // Decode the token to extract user ID
      setState(() {
        _userId = userId;
      });
    }
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
            automaticallyImplyLeading: false,
            backgroundColor: Colors.black,
            title: const Text(
              'Forum',
              style: TextStyle(
                color: Color(0xFFFFD700),
              ),
            ),
            actions: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Forum title at the center

                  ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => CreatePostPage(
                            userId: _userId ?? "",
                            onPostCreated: _fetchPosts,
                          ),
                        ),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFFFD700),
                      minimumSize: const Size(
                          50, 30), // Adjust the minimum size of the button
                      padding: const EdgeInsets.symmetric(
                          horizontal: 10, vertical: 5), // Adjust padding
                    ),
                    child: const Text(
                      'Create a Post',
                      style: TextStyle(fontSize: 12, color: Colors.black),
                    ),
                  ),

                  // Logo at the left corner
                  Padding(
                    padding: const EdgeInsets.all(0),
                    child: Image.asset(
                      'images/AKS2.webp',
                      width: 100,
                      height: 50,
                    ),
                  )

                  // Create a Post button at the right corner
                ],
              ),
            ]),
        body: Container(
          decoration: BoxDecoration(
            color: Colors.black.withOpacity(0.7),
          ),
          child: Padding(
            padding: EdgeInsets.all(12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                  child: RefreshIndicator(
                    color: const Color(0xFFFFD700),
                    onRefresh: _fetchPosts,
                    child: SingleChildScrollView(
                      physics: AlwaysScrollableScrollPhysics(),
                      child: Column(
                        children: [
                          ListView.builder(
                            shrinkWrap: true,
                            physics: NeverScrollableScrollPhysics(),
                            itemCount: widget.posts.length,
                            itemBuilder: (context, index) {
                              return _buildPostWidget(widget.posts[index]);
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPostWidget(Post post) {
    List<Widget> editableRowChildren = <Widget>[
      Text(
        '${post.username}',
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
      const Spacer(),
      IconButton(
        icon: Icon(Icons.edit),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => EditPostPage(
                post: post,
                onUpdate: _fetchPostsAndUpdate,
              ),
            ),
          );
        },
      ),
      IconButton(
        icon: Icon(Icons.delete, color: Colors.red),
        onPressed: () {
          _deletePost(post);
        },
      ),
    ];

    List<Widget> defualtRowChildren = <Widget>[
      Text(
        '${post.username}',
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
    ];

    List<Widget> rowChildren = defualtRowChildren;

    if (_userId == post.creatorUserId) {
      rowChildren = editableRowChildren;
    }

    return Card(
      color: Color(0xFFF9F5B6), // Color of cards on intial forum page
      // color: Color(0xFFFFD700),
      margin: EdgeInsets.only(bottom: 8.0),
      child: Padding(
        padding: EdgeInsets.all(7.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: rowChildren),
            Chip(
              label: Text(post.tag),
              backgroundColor: Color(0xFFFFD700),
              labelStyle: TextStyle(color: Colors.white),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(50),
              ),
            ),
            Text(
              post.title,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 18.0,
              ),
            ),
            SizedBox(height: 8.0),
            Text(post.content),
            SizedBox(height: 8.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Row(
                  children: [
                    IconButton(
                      onPressed: () async {
                        await _updateLikes(post.id, post.likes + 1);
                      },
                      icon: Icon(Icons.thumb_up_outlined),
                    ),
                    Text('${post.likes}'),
                  ],
                ),
                // Navigate to comments page when tapped
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => CommentsPage(
                          post: post,
                          userId: _userId ?? "",
                        ),
                      ),
                    );
                  },
                  child: const Row(
                    children: [
                      Icon(Icons.mode_comment_outlined,
                          color: Colors.black),
                      /*
                      const SizedBox(width: 8), // Adjust spacing as needed
                      Text(
                        '${post.comments.length}',
                        style: const TextStyle(
                          color:
                              Colors.black, // Specify black color for the text
                        ),
                      ),
                      */
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

// Method to navigate to comments page
  void _navigateToCommentsPage(Post post) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CommentsPage(
          post: post,
          userId: _userId ?? "",
        ),
      ),
    );
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
          // log(element);
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
          widget.posts = p;
        });
      } else {
        log('Failed to load data: ${response.statusCode}');
      }
    } catch (e) {
      log('Error: $e');
    }
  }

  void _deletePost(Post post) async {
    try {
      final response = await delete(
        Uri.parse('${url}api/delete-post'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          "postId": post.id, // Assuming id is available in Post class
        }),
      );

      if (response.statusCode == 200) {
        setState(() {
          widget.posts.remove(post);
        });
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text("Post deleted successfully"),
        ));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text("Failed to delete post"),
        ));
      }
    } catch (e) {
      log('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Error occurred while deleting post"),
      ));
    }
  }

  Future<void> _updateLikes(String postId, int likes) async {
    try {
      final response = await patch(
        Uri.parse('${url}api/edit-post'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, dynamic>{
          "postId": postId,
          "likes": likes,
        }),
      );

      if (response.statusCode == 200) {
        // Update the likes locally
        final Map<String, dynamic> responseData = jsonDecode(response.body);
        setState(() {
          widget.posts.firstWhere((post) => post.id == postId).likes =
              responseData['likes'];
        });
      } else {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Failed to update likes"),
        ));
      }
    } catch (e) {
      log('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text("Error occurred while updating likes"),
      ));
    }
  }

  void _fetchPostsAndUpdate() {
    _fetchPosts();
  }
}

class CreatePostPage extends StatefulWidget {
  final String? userId;
  final VoidCallback onPostCreated;

  const CreatePostPage({
    Key? key,
    this.userId,
    required this.onPostCreated,
  }) : super(key: key);

  @override
  _CreatePostPageState createState() => _CreatePostPageState();
}

class _CreatePostPageState extends State<CreatePostPage> {
  Storage dataStorage = Storage();
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _contentController = TextEditingController();
  final TextEditingController _tagController = TextEditingController();

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
          backgroundColor: Colors.black.withOpacity(0.7),
          appBar: AppBar(
            //title: const Text('Create Post', style: TextStyle(color: ),),
            backgroundColor: Colors.transparent,
            iconTheme: const IconThemeData(color: Colors.white),
          ),
          body: SingleChildScrollView(
              child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      const Text(
                        "Create New Post",
                        style: TextStyle(color: Colors.white, fontSize: 24),
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          _inputField('Title', _titleController),
                          const SizedBox(height: 16.0),
                          _inputField('Content', _contentController,
                              content: true),
                          const SizedBox(height: 16.0),
                          _inputField('Subject/Tag', _tagController),
                          const SizedBox(height: 16.0),
                          if (showError) _errorMsg(),
                          const SizedBox(height: 16.0),
                          ElevatedButton(
                            onPressed: () async {
                              log("widget.userId: ${widget.userId}");
                              // Check if userId is not null before calling _createPost
                              if (widget.userId != null) {
                                // Send the post data to the API
                                await _createPost(widget.userId);
                                widget.onPostCreated();
                              } else {
                                // Handle the case where userId is null
                                // For example, you could display an error message or return early
                                log("Error: userId is null");
                              }
                            },
                            child: const Text(
                              'Submit',
                              style: TextStyle(
                                color: Colors
                                    .black, // Specify black color for the text
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ))),
        ));
  }

  Widget _errorMsg() {
    return const Text(
      "Please make sure all post fields are filled out correctly",
      textAlign: TextAlign.center,
      style: TextStyle(
        color: Color.fromARGB(255, 182, 37, 37),
        fontSize: 16.0,
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

  Widget _inputField(String labelText, TextEditingController controller,
      {isPassword = false, bool numKeys = false, bool content = false}) {
    int lines;
    var border = UnderlineInputBorder(
      borderSide: BorderSide(color: requirementColor),
    );
    if (content) {
      lines = 5;
    } else {
      lines = 1;
    }
    return TextField(
      maxLines: lines,
      style: const TextStyle(color: Colors.white),
      cursorColor: Colors.white,
      controller: controller,
      keyboardType: numKeys ? TextInputType.number : TextInputType.text,
      decoration: InputDecoration(
        labelText: labelText,
        labelStyle: const TextStyle(color: Colors.white),
        enabledBorder: border,
        focusedBorder: border,
      ),
      obscureText: isPassword,
    );
  }

  // Function to send the post data to the API
  Future<void> _createPost(String? userId) async {
    try {
      if (userId == null) {
        throw ("UserId not found");
      }

      String? username = await dataStorage.getUsername();

      if (username == null) {
        throw ("Username not found");
      }

      String title = _titleController.text;
      String postBody = _contentController.text;
      String tag = _tagController.text;

      log("userId:  $userId");
      log("username:  $username");
      log("title:  $title");
      log("postBody:  $postBody");
      log("tag:  $tag");

      final response = await post(
        Uri.parse('${url}api/forum-post'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, dynamic>{
          "userId": userId,
          "username": username,
          "title": _titleController.text,
          "postBody": _contentController.text,
          "tag": _tagController.text, // Include subject/tag in the request
          "likes": 0, // Initialize likes to 0
        }),
      );

      if (response.statusCode == 200) {
        // Post created successfully, navigate back to the forum page
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Post created successfully"),
        ));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Failed to create post"),
        ));

        setState(() {
          showError = true;
        });
      }
    } catch (e) {
      log('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Error occurred while creating post"),
      ));
    }
  }
}

class EditPostPage extends StatefulWidget {
  final Post post;
  final VoidCallback onUpdate;

  EditPostPage({required this.post, required this.onUpdate});

  @override
  _EditPostPageState createState() => _EditPostPageState();
}

class _EditPostPageState extends State<EditPostPage> {
  late TextEditingController _titleController;
  late TextEditingController _contentController;
  late TextEditingController _tagController;

  Color requirementColor = Colors.white;
  bool showError = false;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.post.title);
    _contentController = TextEditingController(text: widget.post.content);
    _tagController = TextEditingController(text: widget.post.tag);
  }

  Future<void> _editPost(Post post) async {
    try {
      final response = await patch(
        Uri.parse('${url}api/edit-post'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, dynamic>{
          "postId": post.id,
          "title": post.title,
          "postBody": post.content,
          "tag": post.tag,
        }),
      );

      if (response.statusCode == 200) {
        widget.onUpdate();
        Navigator.pop(context); // Pop the EditPostPage
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Post updated successfully"),
        ));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Failed to update post"),
        ));
      }
    } catch (e) {
      log('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Error occurred while updating post"),
      ));
    }
  }

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
          backgroundColor: Colors.black.withOpacity(0.7),
          appBar: AppBar(
            title: Text('Edit Post'),
            iconTheme: const IconThemeData(color: Colors.white),
            backgroundColor: Colors.transparent,
          ),
          body: SingleChildScrollView(
              child: Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const Text(
                  "Edit Post",
                  style: TextStyle(color: Colors.white, fontSize: 24),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    _inputField('Title', _titleController),
                    const SizedBox(height: 16.0),
                    _inputField('Content', _contentController, content: true),
                    const SizedBox(height: 16.0),
                    _inputField('Subject/Tag', _tagController),
                    const SizedBox(height: 16.0),
                    if (showError) _errorMsg(),
                    const SizedBox(height: 16.0),
                    ElevatedButton(
                      onPressed: () {
                        // Update the post
                        widget.post.title = _titleController.text;
                        widget.post.content = _contentController.text;
                        widget.post.tag = _tagController.text;
                        // Call the _editPost method and pass the updated post
                        _editPost(widget.post);
                      },
                      child: const Text('Save',
                          style: TextStyle(
                            color: Colors.black,
                          )),
                    ),
                  ],
                )
              ],
            ),
          )),
        ));
  }

  Widget _errorMsg() {
    return const Text(
      "Please make sure all post fields are filled out correctly",
      textAlign: TextAlign.center,
      style: TextStyle(
        color: Color.fromARGB(255, 182, 37, 37),
        fontSize: 16.0,
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

  Widget _inputField(String labelText, TextEditingController controller,
      {isPassword = false, bool numKeys = false, bool content = false}) {
    int lines;
    var border = UnderlineInputBorder(
      borderSide: BorderSide(color: requirementColor),
    );
    if (content) {
      lines = 5;
    } else {
      lines = 1;
    }
    return TextField(
      maxLines: lines,
      style: const TextStyle(color: Colors.white),
      cursorColor: Colors.white,
      controller: controller,
      keyboardType: numKeys ? TextInputType.number : TextInputType.text,
      decoration: InputDecoration(
        labelText: labelText,
        labelStyle: const TextStyle(color: Colors.white),
        enabledBorder: border,
        focusedBorder: border,
      ),
      obscureText: isPassword,
    );
  }
}

class CommentsPage extends StatefulWidget {
  final String userId;
  final Post post;

  CommentsPage({required this.userId, required this.post});

  @override
  _CommentsPageState createState() => _CommentsPageState();
}

class _CommentsPageState extends State<CommentsPage> {
  Storage dataStorage = Storage();
  String? userId = '';
  TextEditingController _commentController = TextEditingController();
  List<Comment> _comments = [];

  @override
  void initState() {
    super.initState();
    _fetchComments();
    _getUserId();
  }

  Future<void> _getUserId() async {
    String? userId = await dataStorage.getUserId();
    this.userId = userId;
  }

  Future<void> _addComment() async {
    if (_commentController.text.isEmpty) {
      // Show a dialog informing the user that the comment cannot be empty
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text("Empty Comment"),
            content: const Text("Please enter a comment before adding."),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop(); // Close the dialog
                },
                child: const Text(
                  "OK",
                  style: TextStyle(
                    color: Colors.black, // Specify black color for the text
                  ),
                ),
              ),
            ],
          );
        },
      );
      return; // Exit the method
    }

    // Send the new comment to the backend
    try {
      log("widget.post.id ${widget.post.id}");
      // Prepare the request body
      Map<String, dynamic> requestBody = {
        "userId": widget.userId,
        "postId": widget.post.id,
        "commentBody": _commentController.text,
      };

      // Send a POST request to create a new comment
      final response = await post(
        Uri.parse('${url}api/forum-comment'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(requestBody),
      );

      // Check the response status code
      if (response.statusCode == 200) {
        // Parse the response body
        final Map<String, dynamic> responseData = jsonDecode(response.body);
        log(responseData.toString());

        // Construct a new Comment object from the response data
        Comment newComment = Comment(
          id: responseData['_id'],
          user: responseData['user'],
          commentBody: responseData['commentBody'],
          likes: responseData['likes'],
          post: responseData['post'],
        );

        // Update the UI by adding the new comment to the list
        setState(() {
          _comments.add(newComment);
          _commentController.clear();
        });

        // Show a snackbar to indicate that the comment was successfully added
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Comment added successfully"),
        ));
      } else {
        log(response.statusCode.toString());
        log(response.body);
        // Show a snackbar to indicate that an error occurred
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Failed to add comment"),
        ));
      }
    } catch (e) {
      // Handle any errors that occurred during the process
      log('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("An error occurred while adding comment"),
      ));
    }
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
          backgroundColor: Colors.black.withOpacity(0.7),
          appBar: AppBar(
            backgroundColor: Colors.transparent,
            title: const Text(
              'Comments',
              style: TextStyle(color: Colors.white),
            ),
            centerTitle: true,
            iconTheme: const IconThemeData(color: Colors.white),
          ),
          body: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Display post title on top
              Card(
                color: Color(0xFFF9F5B6), // Color of cards in comment view
                elevation: 10, // Add some elevation for a raised look
                // margin: EdgeInsets.all(16.0), // Add margin for spacing
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text(
                        widget.post.title,
                        style: TextStyle(
                          fontSize: 24, // Larger font size
                          fontWeight: FontWeight.bold, // Bold text
                        ),
                      ),
                      SizedBox(height: 3), // Add spacing between title and body
                      Text(
                        widget.post.content,
                        style: TextStyle(
                          fontSize: 16, // Regular font size
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Expanded(
                child: Container(
                  //color: Color(0xFFF9F5B6),// Background color in comment view
                  //color: Colors.black,
                  child: Stack(
                    children: [
                      Positioned.fill(
                          left: MediaQuery.of(context).size.width / 4,
                          child: ListView.builder(
                            itemCount: _comments.length,
                            itemBuilder: (context, index) {
                              return FutureBuilder(
                                future: _getUsername(_comments[index].user),
                                builder: (BuildContext context,
                                    AsyncSnapshot<String> snapshot) {
                                  if (snapshot.connectionState ==
                                      ConnectionState.waiting) {
                                    return const CircularProgressIndicator(
                                      color: Colors.transparent,
                                    ); // Show loading indicator while waiting for the username
                                  } else if (snapshot.hasError) {
                                    return Text(
                                        'Error: ${snapshot.error}'); // Show error message if there's an error
                                  } else {
                                    return Card(
                                      margin: EdgeInsets.all(8.0),
                                      color: Color(
                                          0xFFF9F5B6), // Color of comments
                                      //color: Color(0xFFFFD700),
                                      child: ListTile(
                                        title: Text(snapshot.data ??
                                            'Username not available'), // Display the username obtained from the snapshot
                                        subtitle: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(_comments[index].commentBody),
                                            Row(
                                                children: buildCommentRow(
                                                    _comments[index])),
                                          ],
                                        ),
                                      ),
                                    );
                                  }
                                },
                              );
                            },
                          )),
                      Positioned(
                          left: 0,
                          right: 0,
                          bottom: 30,
                          child: Container(
                            height: 150, // Specify the height here
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Container(
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: Colors.black),
                                height: 25,
                                child: Column(
                                  crossAxisAlignment:
                                      CrossAxisAlignment.stretch,
                                  children: [
                                    Expanded(
                                        child: TextField(
                                      controller: _commentController,
                                      maxLines: null, // Allow unlimited lines
                                      keyboardType: TextInputType.multiline,
                                      style: TextStyle(color: Colors.white),
                                      decoration: const InputDecoration(
                                          hintText: 'Enter your comment',
                                          hintStyle:
                                              TextStyle(color: Colors.white),
                                          focusedBorder: UnderlineInputBorder(
                                              borderSide: BorderSide(
                                                  color: Color(0xFFF9F5B6)))),
                                    )),
                                    SizedBox(height: 8.0),
                                    ElevatedButton(
                                      onPressed: _addComment,
                                      //style: ButtonStyle(minimumSize: MaterialStateProperty.all(Size(150, 10)),
                                      child: const Text(
                                        'Add Comment',
                                        style: TextStyle(
                                          color: Colors
                                              .black, // Specify black color for the text
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          )),
                    ],
                  ),
                ),
              )
            ],
          ),
        ));
  }

  List<Widget> buildCommentRow(Comment comment) {
    if (widget.userId == comment.user) {
      return [
        IconButton(
          icon: Icon(Icons.thumb_up),
          onPressed: () {
            _likeComment(comment.id);
          },
        ),
        Text('${comment.likes}'),
        Spacer(),
        IconButton(
          icon: Icon(Icons.edit),
          onPressed: () {
            editButtonFunc(comment.commentBody, comment.id);
          },
        ),
        IconButton(
          icon: Icon(Icons.delete, color: Colors.red),
          onPressed: () {
            deleteButtonFunc(comment.id);
          },
        ),
      ];
    } else {
      return [
        IconButton(
          icon: Icon(Icons.thumb_up),
          onPressed: () {
            _likeComment(comment.id);
          },
        ),
        Text('${comment.likes}')
      ];
    }
  }

  void editButtonFunc(String commentBody, String commentId) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.black,
          title: Text(
            "Edit Comment",
            style: TextStyle(color: Colors.white),
          ),
          content: SingleChildScrollView(
            child: TextField(
              style: TextStyle(color: Colors.white),
              controller: TextEditingController(text: commentBody),
              onChanged: (value) {
                commentBody = value;
              },
              keyboardType: TextInputType.multiline,
              maxLines: null,
              decoration: InputDecoration(
                hintText: 'Enter your comment',
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: Text(
                "Cancel",
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
            ),
            TextButton(
              onPressed: () {
                _editComment(commentId, commentBody);
                Navigator.of(context).pop(); // Close the dialog
              },
              child: Text(
                "Save",
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  void deleteButtonFunc(String commentId) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.black,
          title: const Text(
            "Delete Comment",
            style: TextStyle(color: Colors.white),
          ),
          content: const Text(
            "Are you sure you want to delete this comment?",
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
                _deleteComment(commentId);
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

  // Function to like a comment
  Future<void> _likeComment(String commentId) async {
    try {
      // Find the comment in the _comments list
      Comment comment =
          _comments.firstWhere((comment) => comment.id == commentId);

      // Increment the likes count by 1
      comment.likes += 1;

      final response = await patch(
        Uri.parse(
            '${url}api/edit-comment'), // Use the same endpoint for editing comments
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({'commentId': commentId, 'likes': comment.likes}),
      );

      if (response.statusCode == 200) {
        // Update the UI by fetching comments again
        await _fetchComments();
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Comment liked successfully"),
        ));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Failed to like comment"),
        ));
      }
    } catch (e) {
      log('Error liking comment: $e');
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("An error occurred while liking comment"),
      ));
    }
  }

// Function to delete a comment
  Future<void> _deleteComment(String commentId) async {
    try {
      final response = await delete(
        Uri.parse('${url}api/delete-comment'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          'commentId': commentId,
          'postId': widget.post.id,
        }),
      );

      if (response.statusCode == 200) {
        // Update the UI by fetching comments again
        await _fetchComments();
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Comment deleted successfully"),
        ));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Failed to delete comment"),
        ));
      }
    } catch (e) {
      log('Error deleting comment: $e');
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("An error occurred while deleting comment"),
      ));
    }
  }

  // Function to edit a comment
  Future<void> _editComment(String commentId, String newCommentBody) async {
    try {
      final response = await patch(
        Uri.parse('${url}api/edit-comment'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          'commentId': commentId,
          'commentBody': newCommentBody,
        }),
      );

      if (response.statusCode == 200) {
        // Update the UI by fetching comments again
        await _fetchComments();
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Comment edited successfully"),
        ));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Failed to edit comment"),
        ));
      }
    } catch (e) {
      log('Error editing comment: $e');
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("An error occurred while editing comment"),
      ));
    }
  }

  Future<void> _fetchComments() async {
    try {
      final response = await get(
        Uri.parse('${url}all-comments?post=${widget.post.id}'),
      );

      if (response.statusCode == 200) {
        final List<dynamic> responseData = jsonDecode(response.body);

        List<Comment> comments = responseData.map((commentData) {
          return Comment(
            id: commentData['_id'],
            user: commentData['user'],
            commentBody: commentData['commentBody'],
            likes: commentData['likes'],
            post: commentData['post'],
          );
        }).toList();

        setState(() {
          _comments = comments;
        });
      } else {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("Failed to fetch comments"),
        ));
      }
    } catch (e) {
      log('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("An error occurred while fetching comments"),
      ));
    }
  }

  Future<String> _getUsername(String userId) async {
    // Fetch posts from an API and update _posts list
    try {
      final response = await post(
        Uri.parse('${url}api/find-user'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          "userId": userId,
        }),
      );

      // Handle the response based on its status code
      if (response.statusCode == 200) {
        final dynamic data = jsonDecode(response.body);

        final username = data.isNotEmpty ? data['username'] : null;
        if (username != null) {
          return username;
        } else {
          log('Username not found');
        }
      } else {
        log('Failed to load data: ${response.statusCode}');
      }
    } catch (e) {
      log('Error: $e');
    }

    return " ";
  }
}

// Define a Post class to represent individual posts
class Post {
  final String creatorUserId;
  final String username;
  final String id;
  String title;
  String content;
  String tag;
  int likes;
  bool editable;
  List<dynamic> comments; // Add a list of comments

  Post({
    required this.creatorUserId,
    required this.username,
    required this.id,
    required this.title,
    required this.content,
    required this.tag,
    this.likes = 0,
    this.editable = false,
    this.comments = const [], // Initialize comments list
  });
}

class Comment {
  final String id;
  final String user;
  final String commentBody;
  final String post;
  int likes;

  Comment({
    required this.id,
    required this.user,
    required this.commentBody,
    required this.post,
    this.likes = 0,
  });
}
