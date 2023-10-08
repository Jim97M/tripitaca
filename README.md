                                 #Tripitaca

Following Implementation of the Requires Tasks, Here is a Detailed SetUp:

         BackEnd SetUp:

1. Clone The Repository to Your LocalSetUp:

Navigate To Your Directory. Clone The Repository:

#git clone https://github.com/Jim97M/tripitaca.git

2.  Navigate to Folder tripitaca:

Install Node Modules:

#npm install --legacy-peer-deps

3.  Configure Database Connection:

I have connected to my Mongo Atlas Url, which will still run. But you can Configure MongoDB Url From Your End:

Follow MongoDb Documentation to Create a Database in Mongo Atlas.

Retrieve the URL and Connect in file: app.module.ts: In VsCode you can type: ctrl+p then in the popup input type app.module.ts.

Replace code Snippet:
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

In The: MongooseModule.forRoot('mongodb+srv://Yobi:yobi123@atlascluster.6ucwujg.mongodb.net/?retryWrites=true&w=majority')

Add your url In the Brackets.

Make Sure you have enabled connection from all addresses to connect to MongoDb, I have enabled it in my database.

4. Run The Application:

   #npm start

The application runs on port 3001:

Its url will be: http://localhost:3001
