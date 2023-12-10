        var combinedText = '';
        var textAreaPlaceholder = 'Enter text here...';

        document.addEventListener('DOMContentLoaded', initialLoad);

        var textAreas = [
            {id: "inputBox", label: "Parse Text:"},
            {id: "currentOutput", label: "Current Output:"},
        ];

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
            {heading: "Signal TX: ", contents: ''},
            {heading: "Modulation: ", contents: ''},
            {heading: "Noise Floor: ", contents: ''},
            {heading: "Radio and ", contents: ''},
            {heading: "Distance: ", contents: ''},
            {heading: "Dish Cover: ", contents: ''},
            {heading: "Firmware: ", contents: ''},
            {heading: "LAN Speed: ", contents: ''},

            {heading: "Programming: ", contents: ''},
            {heading: "Best Scanned Sector: ", contents: ''},

            {heading: "\nInventory Info", sectionHeader: ''},

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
            {regExp: new RegExp(/Start Time\s*\n*\s*([0-9]{2}:[0-9]{2}\s*[AP]M)/), target: findInfoByHeading("Start Time: ")},
            {regExp: new RegExp(/End Time\s*\n*\s*([0-9]{2}:[0-9]{2}\s*[AP]M)/), target: findInfoByHeading("End Time: ")},
            {regExp: new RegExp(/\bTech Notes\s*(.*)\b/), target: findInfoByHeading("Tech Notes: ")},
            {regExp: new RegExp(/\bMount\s*\n*\r*(.*?)\n/), target: findInfoByHeading("Mount: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Type of Wire: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Length of Wire: ")},
            //{regExp: new RegExp(), target: findInfoByHeading("Available Towers: ")},
            {regExp: new RegExp(/LOCAL DEVICE[\s\S]*?\bSIGNAL\s+(-?\d+)/), target: findInfoByHeading("Signal RX: ")},
            {regExp: new RegExp(/REMOTE DEVICE[\s\S]*?\bSIGNAL\s+(-?\d+)/), target: findInfoByHeading("Signal TX: ")},
            {regExp: new RegExp(/LOCAL DEVICE[\s\S]*?LOCAL RX DATA RATE\s+([\s\S]*?)(?=\nEXPECTED RATE)/), target: findInfoByHeading("Modulation: ")},
            {regExp: new RegExp(/LOCAL DEVICE[\s\S]*?\bNOISE FLOOR\s+(-?\d+ dBm)/), target: findInfoByHeading("Noise Floor: ")},
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

        function generateCombinedText(copyBOOL) 
        {
            combinedText = '';

            info.forEach(mapping => 
            {
                if("contents" in mapping)
                    addToOutputText(mapping.heading, mapping.contents);
                else
                    addToOutputText(mapping.heading, '');
                
                if(mapping.heading === "\nInventory Info")
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

        //If we ever remove the checkboxes this whole structure should just be refactorable into the other form of info
        function addTextFromCheckBox()
        {
            var checkBoxes = document.querySelectorAll('input[type=checkbox]');
            checkBoxes.forEach(function(checkbox) 
            {
                
                var labelText = checkbox.nextElementSibling.textContent;

                if(checkbox.checked){
                    combinedText += labelText + ": GOOD\n";
                }
                else{
                    combinedText += labelText + ": BAD\n";
                }
            });

        }

        //This got a little messy because we don't want to handle distance alone
        function addToOutputText(header, string) 
        {
            if (header === "Radio and ") 
            {
                var distanceEntry = findInfoByHeading("Distance: ");
        
                combinedText += header + "Distance: ";

                if(string)
                    combinedText += "" + string;
                
                if(distanceEntry.contents)
                    combinedText += ", " + distanceEntry.contents + "\n";

            }
            else if (header !== "Distance: ") 
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
            
        };
