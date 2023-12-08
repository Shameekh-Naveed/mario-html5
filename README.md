## Installation

To install the project, make sure you have [Node.js](https://nodejs.org/) installed. This project has been tested and runs successfully on Node.js v20.8.0. While it may work on other versions, it hasn't been verified.

**Project Dependencies and Node Version**

This project was initially developed using Node.js version 16. However, during the development process, it became necessary to update certain dependencies and incorporate additional libraries to enable the multiplayer functionality. As a result, the required Node.js version for this project might have changed.

It is important to note that making major changes to the project's dependencies and Node.js version can potentially introduce complexities and potential compatibility issues. While efforts have been made to ensure a smooth transition, unforeseen bugs might arise due to these changes.

Thank you for your understanding and cooperation.

1. Clone the repository:

   ````bash
   git clone https://github.com/Shameekh-Naveed/mario-html5.git
   ```

2. Navigate to the project directory:

   ````bash
   cd mario-html5
   ```

3. Install the dependencies:

   ````bash
   npm install
   ```

## Usage

To start the project, run the following command:

```bash
npm run start
```

This will start the application and you can access it by navigating to `http://localhost:8080` in your web browser.
You should get an invite link, any client who opens that link (provided both clients are on same network) should be able to join the room and play 


Overview:
This project aims to add multiplayer functionality to an existing Mario game. The main goal is to synchronize and enable multiple players to play together in the same game world. However, there are a few known issues and limitations that should be considered.

#### Known Issues:

Enemies' Death Propagation: Currently, there is a bug in the game where the function to propagate an enemy's death to remote clients does not work as intended. This means that when an enemy is killed by one player, the death event is not properly synchronized and displayed for other players.

Testing Limitations:
Due to time constraints, the project has been tested to a limited possible extent, but unexpected bugs shall still arise. It is important to note that the multiplayer functionality is working properly but there are still some changes that havent been synced in the entire codebase and might cause an error at someplaces

Development Warning:
There is a development warning that can safely be ignored by clicking on the "x" icon on the top right corner of error display
