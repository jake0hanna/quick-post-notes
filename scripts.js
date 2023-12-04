        var combinedText = '';
        var textAreaPlaceholder = 'Enter text here...';

        document.addEventListener('DOMContentLoaded', initialLoad);

        let jobInfo = 
        {
            startTime: '',
            endTime: '',
            techNotes: '',
            mount: '',
            typeOfWire: '',
            wireLength: '',
            availableTowers: '',

        }

        let radioInfo = 
        {
            signalRX: '',
            signalTX: '',
            modulation: '',
            noiseFloor: '',
            radioAndDistance: '',
            dishCover: '',
            firmware: '',
            lanSpeed: '',
            programming: '',
            bestScannedSector: '',
        }

        let inventoryInfo = 
        {
            safetyPic: false,
            dashboardPic: false,
            LOSPic: false,
            mountFootingPic: false,
            fromGroundPic: false,
            wireRunPic: false,
            outsidePenetrationPic: false,
            insidePenetrationPic: false,
            POERouterPic: false,
            radioTagPic: false,
            POETagPic: false,
            surgeBoxTagPic: false,
            routerTagPic: false,
            speedTestPic: false,
            jitter: ''

        }
        
        let routerInfo =
        {
            routerModel: '',
            routerChannels: '',
            routerFirmware: '',
            remoteManagement: '',
            supportTab: '',
            routerJitter: '',
        }

        let startTimeRegExp = new RegExp(/Start Time\s*\n*\s*([0-9]{2}:[0-9]{2}\s*[AP]M)/);
        let endTimeRegExp = new RegExp(/End Time\s*\n*\s*([0-9]{2}:[0-9]{2}\s*[AP]M)/);        
        let techNotesRegExp = new RegExp(/\bTech Notes\s*(.*)\b/);
        let mountRegExp = new RegExp(/\bMount\s*\n*\r*(.*?)\n/);
        let typeOfWireRegExp = new RegExp();
        let wireLengthRegExp = new RegExp();
        let availableTowersRegExp = new RegExp();

        let signalRXRegExp = new RegExp();
        let signalTXRegExp = new RegExp();
        let modulationRegExp = new RegExp();
        let noiseFloorRegExp = new RegExp();
        let radioAndDistanceRegExp = new RegExp();
        let dishCoverRegExp = new RegExp();
        let firmwareRegExp = new RegExp();
        let lanSpeedRegExp = new RegExp();
        let programmingRegExp = new RegExp();
        let bestScannedSectorRegExp = new RegExp();

        let routerModelRegExp = new RegExp();
        let routerChannelsRegExp = new RegExp();
        let routerFirmwareRegExp = new RegExp();
        let remoteManagementRegExp = new RegExp();
        let supportTabRegExp = new RegExp();
        let routerJitterRegExp = new RegExp();
        

        function clearMemory()
        {
            combinedText = '';

            jobInfo =
            {
                startTime: '',
                endTime: '',
                techNotes: '',
                mount: '',
                typeOfWire: '',
                wireLength: '',
                availableTowers: '',
        
            }

            radioInfo =
            {
                signalRX: '',
                signalTX: '',
                modulation: '',
                noiseFloor: '',
                radioAndDistance: '',
                dishCover: '',
                firmware: '',
                lanSpeed: '',
                programming: '',
                bestScannedSector: '',
            }

            inventoryInfo =
            {
                safetyPic: false,
                dashboardPic: false,
                LOSPic: false,
                mountFootingPic: false,
                fromGroundPic: false,
                wireRunPic: false,
                outsidePenetrationPic: false,
                insidePenetrationPic: false,
                POERouterPic: false,
                radioTagPic: false,
                POETagPic: false,
                surgeBoxTagPic: false,
                routerTagPic: false,
                speedTestPic: false,
                jitter: ''
        
            }

            routerInfo =
            {
                routerModel: '',
                routerChannels: '',
                routerFirmware: '',
                remoteManagement: '',
                supportTab: '',
                routerJitter: '',
            }

            clearTextBoxes();

            document.querySelectorAll('input[type=checkbox]').forEach(function(checkbox) 
            {
                checkbox.checked = false;
            });

            
        }

        function parse()
        {
            let string = document.getElementById('inputBox').value;

            console.log(string);

            let cip = startTimeRegExp.exec(string);
            console.log(cip);
            if(cip){
                jobInfo.startTime = cip[1];
            }

            cip = endTimeRegExp.exec(string);
            if(cip){
                jobInfo.endTime = cip[1];
            }

            cip = techNotesRegExp.exec(string);
            if(cip){
                jobInfo.techNotes = cip[1];
            }

            cip = mountRegExp.exec(string);
            if(cip){
                jobInfo.mount = cip[1];
            }

            cip = typeOfWireRegExp.exec(string);
            if(cip){
                jobInfo.typeOfWire = cip[1];
            }

            cip = wireLengthRegExp.exec(string);
            if(cip){
                jobInfo.wireLength = cip[1];
            }
            
            cip = availableTowersRegExp.exec(string);
            if(cip){
                jobInfo.availableTowers = cip[1];
            }

            cip = signalRXRegExp.exec(string);
            if(cip){
                radioInfo.signalRX = cip[1];
            }

            cip = signalTXRegExp.exec(string);
            if(cip){
                radioInfo.signalTX = cip[1];
            }

            cip = modulationRegExp.exec(string);
            if(cip){
                radioInfo.modulation = cip[1];
            }

            cip = noiseFloorRegExp.exec(string);
            if(cip){
                radioInfo.noiseFloor = cip[1];
            }

            cip = radioAndDistanceRegExp.exec(string);
            if(cip){
                radioInfo.radioAndDistance = cip[1];
            }

            cip = dishCoverRegExp.exec(string);
            if(cip){
                radioInfo.dishCover = cip[1];
            }

            cip = firmwareRegExp.exec(string);
            if(cip){
                radioInfo.firmware = cip[1];
            }

            cip = lanSpeedRegExp.exec(string);
            if(cip){
                radioInfo.lanSpeed = cip[1];
            }

            cip =programmingRegExp.exec(string);
            if(cip){
                radioInfo.programming = cip[1];
            }

            cip = bestScannedSectorRegExp.exec(string);
            if(cip){
                radioInfo.bestScannedSector = cip[1];
            }

            cip = routerModelRegExp.exec(string);
            if(cip){
                routerInfo.routerModel = cip[1];
            }
            
            cip = routerChannelsRegExp.exec(string);
            if(cip){
                routerInfo.routerChannels = cip[1];
            }

            cip = routerFirmwareRegExp.exec(string);
            if(cip){
                routerInfo.routerFirmware = cip[1];
            }

            cip = remoteManagementRegExp.exec(string);
            if(cip){
                routerInfo.remoteManagement = cip[1];
            }

            cip = supportTabRegExp.exec(string);
            if(cip){
                routerInfo.supportTab = cip[1];
            }

            cip = routerJitterRegExp.exec(string);
            if(cip){
                routerInfo.routerJitter = cip[1];
            }

            
            pushCurrentInfo();

            clearParseTextBox();

        }

        function pushCurrentInfo()
        {
            //needs to take the current result of generateCombinedText and put it into the current output text box
            generateCombinedText(false);


        }

        function generateCombinedText(bool) 
        {
            combinedText = '';

            combinedText += 'Job Information \n';
            addTextIfNotEmpty(jobInfo.startTime, "Start Time");
            addTextIfNotEmpty(jobInfo.endTime, "End Time");
            addTextIfNotEmpty(jobInfo.techNotes, "Tech Notes");
            addTextIfNotEmpty(jobInfo.mount, "Mount");
            addTextIfNotEmpty(jobInfo.typeOfWire, "Type of Wire");
            addTextIfNotEmpty(jobInfo.wireLength, "Length of Wire");
            addTextIfNotEmpty(jobInfo.availableTowers, "Available Towers");

            combinedText += '\nRadio Information \n';
            addTextIfNotEmpty(radioInfo.signalRX, "Signal RX");
            addTextIfNotEmpty(radioInfo.signalTX, "Signal TX");
            addTextIfNotEmpty(radioInfo.modulation, "Modulation");
            addTextIfNotEmpty(radioInfo.noiseFloor, "Noise Floor");
            addTextIfNotEmpty(radioInfo.radioAndDistance, "Radio and Distance");
            addTextIfNotEmpty(radioInfo.dishCover, "Dish Cover");
            addTextIfNotEmpty(radioInfo.firmware, "Firmware");
            addTextIfNotEmpty(radioInfo.lanSpeed, "LAN Speed");
            addTextIfNotEmpty(radioInfo.programming, "Programming");
            addTextIfNotEmpty(radioInfo.bestScannedSector, "Best Scanned Sector");

            combinedText += '\nInventory Information \n';
            addTextFromCheckBox();

            combinedText += "Router Information \n";
            addTextIfNotEmpty(routerInfo.routerModel, "Router Model");
            addTextIfNotEmpty(routerInfo.routerChannels, "Router Channels");
            addTextIfNotEmpty(routerInfo.routerFirmware, "Router Firmware");
            addTextIfNotEmpty(routerInfo.remoteManagement, "Remote Management");
            addTextIfNotEmpty(routerInfo.supportTab, "Support Tab");
            addTextIfNotEmpty(routerInfo.routerJitter, "Router Jitter");

        

            if(bool)
            {
                copyToClipBoard(combinedText);
            }
            
            document.getElementById('currentOutput').value = combinedText;



        }

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

            combinedText += "Jitter: " + inventoryInfo.jitter + "\n\n";
        }

        function addTextIfNotEmpty(string, header)
        {
            if(string){
                combinedText += header + ": " +string + "\n";
            }
            else{
                combinedText += header + ": \n";
            }

        }

        function copyToClipBoard(copyableText){
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

            var textAreas = [
                {id: "inputBox", label: "Parse Text:"},
                {id: "currentOutput", label: "Current Output:"},
            ];

            var buttons = [

                {id: "safetyPicButton", label: "Safety"},
                {id: "dashboardPicButton", label: "Dashboard"},
                {id: "LOSPicButton", label: "LOS"},
                {id: "mountFootingPicButton", label: "Mount Footing"},
                {id: "fromGroundPicButton", label: "From Ground"},
                {id: "wireRunPicButton", label: "Wire Run"},
                {id: "outsidePenetrationPicButton", label: "Outside Penetration"},
                {id: "insidePenetrationPicButton", label: "Inside Penetration"},
                {id: "POERouterPicButton", label: "POE Router"},
                {id: "radioTagPicButton", label: "Radio Tag"},
                {id: "POETagPicButton", label: "POE Tag"},
                {id: "surgeBoxTagPicButton", label: "Surge Box Tag"},
                {id: "routerTagPicButton", label: "Router Tag"},
                {id: "speedTestPicButton", label: "Speed Test"},

            ];

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



        };
