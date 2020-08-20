const fs = require("fs")
const path = require("path")

const args = process.argv

//console.log('Argumentos', process.argv.join('--'))

var dirOrig = args[2],
    dirDest = args[3]



// for(var x in fs){
	// console.log(x)
// }

/**
 * Look ma, it's cp -R.
 * @param {string} src The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
var copyRecursiveSync = function(src, dest) {

  //console.log(src)
  //console.log(dest)

  if(!fs.existsSync(src)){
    console.log('Diretorio origem inexistente ' + src )
    return;
  } 

  if(!fs.existsSync(dest)){
    fs.mkdirSync(dest);
  } 

  fs.readdirSync(src).forEach(function(file) {
	
	var oldFile = src + '\\' + file
	var newFile = dest + '\\' + file
	
    console.log(oldFile)
	
    var stats = fs.statSync(oldFile);
    var isDirectory = stats.isDirectory();
	

    if(!isDirectory){
      if(!fs.existsSync(newFile)){
		  console.log('------------------------'+file)
		  
        //fs.copyFileSync('.\\' + src + '\\' + file, '.\\' + dest + '\\' + file);
		
		fs.rename(oldFile, newFile, function (err) {
			if (err) {
				// if (err.code === 'EXDEV') {
					// copy();
				// } else {
					// callback(err);
				// }
				console.log(err)
				return;
			}
		});
		
		
		
		
		
      }      
    }else{
      copyRecursiveSync(oldFile, newFile);
    }

    // copyRecursiveSync(path.join(src, childItemName),
    //                   path.join(dest, childItemName));
  });


  
  
};

copyRecursiveSync(dirOrig, dirDest)


// return;
//   var exists = fs.existsSync(src);
//   var stats = exists && fs.statSync(src);
//   var isDirectory = exists && stats.isDirectory();
//   if (isDirectory) {
    
//     fs.readdirSync(src).forEach(function(childItemName) {
//       copyRecursiveSync(path.join(src, childItemName),
//                         path.join(dest, childItemName));
//     });
//   } else {
//     //fs.copyFileSync(src, dest);
//   }