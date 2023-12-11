import mongoose from "mongoose";
import { createApp } from "./createApp.js";
// import { initializeFfManager} from "./featureFlag.js";

// const isEnabled = await initializeFfManager()

// if (isEnabled('login_button')) {
//     console.log("show login!");
// }

const app = await createApp()

await mongoose.connect("mongodb://localhost:27017/cordonbleu")
//console.log("Connection reussi");
app.listen(8080)