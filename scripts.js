        var combinedText = '';
        var textAreaPlaceholder = 'Enter text here...';

        document.addEventListener('DOMContentLoaded', initialLoad);

        var textAreas = [
            {id: "inputBox", label: "Parse Text:"},
            {id: "currentOutput", label: "Current Output:"},
        ];

        var pictureInputBoxes = [
            {id: "radioTagPicInput", label: "Radio Tag: "},
            {id: "POETagPicInput", label: "POE Tag: "},
            {id: "surgeBoxTagPicInput", label: "Surge Box Tag: "},
            {id: "routerTagPicInput", label: "Router Tag: "},
        ]

        var buttons = [

            {id: "safetyPicButton", label: "Safety: "},
            {id: "dashboardPicButton", label: "Dashboard: "},
            {id: "LOSPicButton", label: "LOS: "},
            {id: "mountFootingPicButton", label: "Mount Footing: "},
            {id: "fromGroundPicButton", label: "From Ground: "},
            {id: "wireRunPicButton", label: "Wire Run: "},
            {id: "outsidePenetrationPicButton", label: "Outside Penetration: "},
            {id: "insidePenetrationPicButton", label: "Inside Penetration: "},
            {id: "POERouterPicButton", label: "POE Router: "},
            {id: "radioTagPicButton", label: "Radio Tag: "},
            {id: "POETagPicButton", label: "POE Tag: "},
            {id: "surgeBoxTagPicButton", label: "Surge Box Tag: "},
            {id: "routerTagPicButton", label: "Router Tag: "},
            {id: "speedTestPicButton", label: "Speed Test: "},

        ];


        const info = 
        [
            {heading: "Job Info", sectionHeader: ''},

            {heading: "Start Time: ", contents: ''},
            {heading: "End Time: ", contents: ''},
            {heading: "Tech Notes: ", contents: ''},
            {heading: "Mount: ", contents: ''},
            {heading: "Type of Wire: ", contents: ''},
            {heading: "Length of Wire: ", contents: ''},
            {heading: "Available Towers: ", contents: ''},

            {heading: "\nRadio Info", sectionHeader: ''},

            {heading: "Signal RX: ", contents: ''},
            {heading: ", S-TX: ", contents: ''},
            {heading: "Modulation RX: ", contents: ''},
            {heading: ", M-TX: ", contents: ''},
            {heading: "Noise Floor: ", contents: ''},
            {heading: ", NF-TX: ", contents: ''},
            {heading: "Radio and ", contents: ''},
            {heading: "Distance: ", contents: ''},
            {heading: "Dish Cover: ", contents: ''},
            {heading: "Firmware: ", contents: ''},
            {heading: "LAN Speed: ", contents: ''},

            {heading: "Programming: ", contents: ''},
            {heading: "Best Scanned Sector: ", contents: ''},
            {heading: "Inventory Info:", contents: ''},

            {heading: "\nPictures", sectionHeader: ''},

            {heading: "Speed Test Jitter: ", contents: ''},

            {heading: "\nRouter Info", sectionHeader: ''},

            {heading: "Router Model: ", contents: ''},
            {heading: "Router Channels: ", contents: ''},
            {heading: "Router Firmware: ", contents: ''},
            {heading: "Remote Management: ", contents: ''},
            {heading: "Support Tab: ", contents: ''},
            {heading: "Router Jitter: ", contents: ''},
            
        ]

        const regexMappings = 
        [
            {regExp: new RegExp(/Actual Start Time\s+([\d:]+ [APM]+)/), target: findInfoByHeading("Start Time: ")},
            {regExp: new RegExp(/Actual End Time\s+([\d:]+ [APM]+)/), target: findInfoByHeading("End Time: ")},
            {regExp: new RegExp(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\n(.+?)(?=\n\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}|\n\w+)/), target: findInfoByHeading("Tech Notes: ")},
            {regExp: new RegExp(/\bMount\s*\n*\r*(.*?)\n/), target: findInfoByHeading("Mount: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Type of Wire: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Length of Wire: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Available Towers: ")},
            {regExp: new RegExp(/LOCAL DEVICE[\s\S]*?SIGNAL (-?\d+ \(-?\d+ \/ -?\d+\) Δ\d+ dBm)/), target: findInfoByHeading("Signal RX: ")},
            {regExp: new RegExp(/REMOTE DEVICE[\s\S]*?SIGNAL (-?\d+ \(-?\d+ \/ -?\d+\) Δ\d+ dBm)/), target: findInfoByHeading(", S-TX: ")},
            {regExp: new RegExp(/LOCAL DEVICE[\s\S]*?LOCAL RX DATA RATE\s+([\s\S]*?)(?=\nEXPECTED RATE)/), target: findInfoByHeading("Modulation: ")},
            {regExp: new RegExp(), target: findInfoByHeading(", M-TX: ")},
            {regExp: new RegExp(/LOCAL DEVICE[\s\S]*?\bNOISE FLOOR\s+(-?\d+ dBm)/), target: findInfoByHeading("Noise Floor: ")},
            {regExp: new RegExp(/REMOTE DEVICE[\s\S]*?\bNOISE FLOOR\s+(-?\d+ dBm)/), target: findInfoByHeading(", NF-TX: ")},
            {regExp: new RegExp(/DEVICE MODEL\n(.+?)\n/g), target: findInfoByHeading("Radio and ")},
            {regExp: new RegExp(/Mbps\s+([\d.]+\s+mi)/), target: findInfoByHeading("Distance: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Dish Cover: ")},
            {regExp: new RegExp(/LOCAL DEVICE[\s\S]*?VERSION\nv([\d.]+) \(/g), target: findInfoByHeading("Firmware: ")},
            {regExp: new RegExp(/LOCAL DEVICE[\s\S]*?LAN SPEED\n([\d]+ Mbps)/g), target: findInfoByHeading("LAN Speed: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Programming: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Best Scanned Sector: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Router Model: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Router Channels: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Router Firmware: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Remote Management: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Support Tab: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Router Jitter: ")},

        ]
        
        //Should return the object found, not the contents
        function findInfoByHeading(heading)
        {
            return info.find(infoItem => infoItem.heading === heading);
        }

        function clearMemory()
        {
            combinedText = '';

            info.forEach(mapping => 
            {
                if("contents" in mapping)
                    mapping.contents = '';
            });

            clearTextBoxes();

            document.querySelectorAll('input[type=checkbox]').forEach(function(checkbox) 
            {
                checkbox.checked = false;
            });
            
        }

        function parse()
        {
            findInfoByHeading("Speed Test Jitter: ").contents = document.getElementById('jitterTextArea').value;

            let string = document.getElementById('inputBox').value;

            regexMappings.forEach(mapping => {
                let cip = mapping.regExp.exec(string);
                console.log(mapping);
                console.log(mapping.regExp.exec(string));
                if(cip){
                    mapping.target.contents = cip[1];
                }
            });


            
            generateCombinedText(false);

            clearParseTextBox();

        }

        function pullFromTextAreas()
        {
            pictureInputBoxes.forEach(function(pictureInputBox)
            {
                //should just grab any info from the text area and put it in the corresponding object in info
                var textArea = document.getElementById(pictureInputBox.id);
                var infoItem = findInfoByHeading(pictureInputBox.label);
                if (textArea && infoItem) 
                {
                    infoItem.contents = textArea.value;
                }

            }
            );
            
            
        }

        function generateCombinedText(copyBOOL) 
        {
            combinedText = '';

            info.forEach(mapping => 
            {
                if("contents" in mapping)
                    addToOutputText(mapping.heading, mapping.contents);
                else
                    addToOutputText(mapping.heading, '');
                
                if(mapping.heading === "\nPictures")
                {
                    addTextFromCheckBox();
                }

            });

                
            if(copyBOOL)
            {
                copyToClipBoard(combinedText);
            }
            
            document.getElementById('currentOutput').value = combinedText;


        }
        function addTextFromCheckBox() {
            buttons.forEach(function(buttonItem) {
                var checkbox = document.getElementById(buttonItem.id);
                var labelText = buttonItem.label.slice(0, -2); // Removes the trailing ": "
                var textToAdd = labelText + ": ";
        
                // Check if this checkbox corresponds to a picture input box
                var correspondingPictureInputBox = pictureInputBoxes.find(pictureInputBox => 
                    pictureInputBox.id === buttonItem.id.replace('PicButton', 'PicInput'));
        
                if (correspondingPictureInputBox) {
                    // Checkbox has an associated picture input box
                    var pictureInput = document.getElementById(correspondingPictureInputBox.id);
        
                    if (checkbox.checked) {
                        if (pictureInput && pictureInput.value.trim() !== '') {
                            // Checkbox is checked and the input box has content
                            textToAdd += pictureInput.value.trim();
                        } else {
                            // Checkbox is checked but the input box is empty
                            textToAdd += "BAD";
                        }
                    } else {
                        // Checkbox is unchecked
                        textToAdd += "N/A";
                    }
                } else {
                    // Checkbox does not have an associated picture input box
                    textToAdd += checkbox.checked ? "GOOD" : "BAD";
                }
        
                combinedText += textToAdd + "\n";
            });
        }
        
        
        

        //This got a little messy because we don't want to handle certain tags alone
        function addToOutputText(header, string) 
        {
            if (header === "Radio and ") 
            {
                var distanceEntry = findInfoByHeading("Distance: ");
        
                combinedText += header + "Distance: ";

                if(string)
                    combinedText += "" + string;
                
                if(distanceEntry.contents)
                    combinedText += ", " + distanceEntry.contents;

                combinedText += "\n";

            }
            else if (header === "Signal RX: ")
            {

                var signalTXEntry = findInfoByHeading(", S-TX: ");

                combinedText += header + ", S-TX: ";

                if(string)
                    combinedText += "" + string;

                if(signalTXEntry.contents)
                    combinedText += ", " + signalTXEntry.contents;
                
                combinedText +=  "\n";


            }
            else if (header === "Modulation RX: ")
            {

                var modulationTXEntry = findInfoByHeading(", M-TX: ");

                combinedText += header + ", M-TX: ";

                if(string)
                    combinedText += "" + string;

                if(modulationTXEntry.contents)
                    combinedText += ", " + modulationTXEntry.contents;

                combinedText += "\n";

            }
            else if (header === "Noise Floor: ")
            {
                    
                    var noiseFloorTXEntry = findInfoByHeading(", NF-TX: ");
    
                    combinedText += header + ", NF-TX: ";
    
                    if(string)
                        combinedText += "" + string;
    
                    if(noiseFloorTXEntry.contents)
                        combinedText += ", " + noiseFloorTXEntry.contents;
                    
                    combinedText += "\n";
            }
            else if (header !== "Distance: " && header !== ", S-TX: " && header !== ", M-TX: " && header !== ", NF-TX: ") 
            {
                if (string) {
                    combinedText += header + string + "\n";
                } else {
                    combinedText += header + "\n";
                }
            }


            
        }
        
        function copyToClipBoard(copyableText)
        {
            navigator.clipboard.writeText(copyableText).then(function() 
            {
               alert("Text copied to clipboard");
            }, function() {
                alert("Error copying text to clipboard");
            }
            );
        }

        function clearParseTextBox()
        {
            document.getElementById('inputBox').value = '';
        }

        function clearTextBoxes()
        {
            document.querySelectorAll('textarea').forEach(function(textarea) 
            {
                textarea.value = '';
            });

        }

        function initialLoad()  
        {

            var container = document.getElementById('textAreaContainer');

            textAreas.forEach(function(textArea) 
            {
                var textAreaDiv = document.createElement('div');
                textAreaDiv.className = 'textAreaDiv';

                var label = document.createElement('h3');
                label.textContent = textArea.label;
                textAreaDiv.appendChild(label);

                var textarea = document.createElement('textarea');
                textarea.id = textArea.id;
                textarea.placeholder = textAreaPlaceholder;
                textAreaDiv.appendChild(textarea);

                container.appendChild(textAreaDiv);
            });

            var checkboxesContainer = document.createElement('div');
            checkboxesContainer.className = 'checkboxesContainer';
            container.appendChild(checkboxesContainer);

            buttons.forEach(function(checkboxItem) 
            {
                var checkboxDiv = document.createElement('div');
                checkboxDiv.className = 'checkboxDiv';

                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = checkboxItem.id; 
                checkbox.name = checkboxItem.id;

                var label = document.createElement('label');
                label.htmlFor = checkboxItem.id;
                label.textContent = checkboxItem.label;

                checkboxDiv.appendChild(checkbox);
                checkboxDiv.appendChild(label);

                checkboxesContainer.appendChild(checkboxDiv);
            });

            var textAreaDiv = document.createElement('div');
            textAreaDiv.className = 'textAreaDiv';

            var label = document.createElement('h3');
            label.textContent = "Jitter:";
            textAreaDiv.appendChild(label);

            var textarea = document.createElement('textarea');
            textarea.id = "jitterTextArea";
            textarea.placeholder = textAreaPlaceholder;
            textAreaDiv.appendChild(textarea);

            container.appendChild(textAreaDiv);

            document.getElementById('inputBox').addEventListener('input', parse);

            var checkboxDivs = document.getElementsByClassName('checkboxDiv');
            for (var i = 0; i < checkboxDivs.length; i++) 
            {
                var inputs = checkboxDivs[i].getElementsByTagName('input');
                for (var j = 0; j < inputs.length; j++) 
                {
                    if (inputs[j].type === 'checkbox') 
                    {
                        inputs[j].addEventListener('change', parse);
                    }
                }
            }

            var pictureInputContainer = document.createElement('div');
            pictureInputContainer.className = 'pictureInputContainer';
            container.appendChild(pictureInputContainer);
        
            pictureInputBoxes.forEach(function(pictureInputBox) {
                var inputDiv = document.createElement('div');
                inputDiv.className = 'inputDiv';
                inputDiv.id = pictureInputBox.id + 'Div';
                inputDiv.style.display = 'none'; // Initially hide the input boxes
        
                var label = document.createElement('label');
                label.htmlFor = pictureInputBox.id;
                label.textContent = pictureInputBox.label;
        
                var input = document.createElement('input');
                input.type = 'text';
                input.id = pictureInputBox.id;
        
                inputDiv.appendChild(label);
                inputDiv.appendChild(input);
                pictureInputContainer.appendChild(inputDiv);
            });
            
            buttons.forEach(function(buttonItem) 
            {
                var checkbox = document.getElementById(buttonItem.id);
                if (checkbox) 
                {
                    checkbox.addEventListener('change', function() {
                        var inputDiv = document.getElementById(buttonItem.id.replace('PicButton', 'PicInput') + 'Div');
                        if (inputDiv) {
                            if (checkbox.checked) {
                                inputDiv.style.display = 'block'; // Show the input box
                            } else {
                                inputDiv.style.display = 'none'; // Hide the input box
                            }
                        }
                    });
                    
                }
            });
        
        };
