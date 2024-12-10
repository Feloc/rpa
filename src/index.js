import app from './app.js' 

const PORT = app.get('port'); 

app.listen(PORT, (err) => {
    if (err) { 
        console.error(`Error starting server on port ${PORT}:`, err); 
    } else { 
        console.log(`Server is listening on port ${PORT}`); } });


/* app.listen(app.get('port'))
console.log("listen on port", app.get('port') );
 */
// 13/04 14:00

