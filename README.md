# Tripitaca

Following Implementation of the Requires Tasks, Here is a Detailed SetUp:

         BackEnd SetUp:

1. ## Clone The Repository to Your LocalSetUp:

Navigate To Your Directory. Clone The Repository:

                    #git clone https://github.com/Jim97M/tripitaca.git

2.  ## Navigate to Folder tripitaca:

Install Node Modules:

                    #npm install --legacy-peer-deps

3. ## Configure Database Connection:

I have connected to my Mongo Atlas Url, which will still run. But you can Configure MongoDB Url From Your End:

Follow MongoDb Documentation to Create a Database in Mongo Atlas.

Retrieve the URL and Connect in file: app.module.ts: In VsCode you can type: ctrl+p then in the popup input type app.module.ts.

Replace code Snippet:
<span style="color: blue">

<h5>
{
@Module({
imports: [
MongooseModule.forRoot('mongodb+srv://Yobi:yobi123@atlascluster.6ucwujg.mongodb.net/?retryWrites=true&w=majority'),
MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
],
controllers: [AppController, UserController],
providers: [AppService, UserService, JwtService, TokenRevocationService],
})
}
<h5>
</span>

In The: MongooseModule.forRoot('mongodb+srv://Yobi:yobi123@atlascluster.6ucwujg.mongodb.net/?retryWrites=true&w=majority')

Add your url In the Brackets.

Make Sure you have enabled connection from all addresses to connect to MongoDb, I have enabled it in my database.

4.  ## Run The Application:

                 #npm start

The application runs on port 3001:

                Its url will be: http://localhost:3001

# Setting Up FrontEnd

There are Three More Branches

1.  The First App FrontEnd
2.  The Second App FrontEnd
3.  Testing Rate Limiter

Each Branch has ReadME.md with SetUp Instructions

# Please Note: To Run Frontends Application:

     Start By Running Second Frontend: http://localhost:3020
     Then Run First Application: http://localhost:3010

# You can Navigate between Apps Securely
