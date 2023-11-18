        var combinedText = '';
        var textAreaPlaceholder = 'Enter text here...';

        document.addEventListener('DOMContentLoaded', initialLoad);

        function generateCombinedText() 
        {
            combinedText = '';

            addTextIfNotEmpty("textBox1", "Start Time:\n");
            addTextIfNotEmpty("textBox2", "End Time:\n");
            addTextIfNotEmpty("textBox3", "Tech Notes:\n");
            addTextIfNotEmpty("textBox4", "Mount:\n");
            addTextIfNotEmpty("textBox5", "Wire:\n");
            addTextIfNotEmpty("textBox6", "Length of Wire Used:\n");
            addTextIfNotEmpty("textBox7", "Available Towers/Scans:\n");
            addTextIfNotEmpty("textBox8", "Additional Notes 1:\n");
            addTextIfNotEmpty("textBox9", "Additional Notes 2:\n");
            addTextIfNotEmpty("textBox10", "Additional Notes 3:\n");

            copyToClipBoard(combinedText);

        }

        function addTextIfNotEmpty(textBoxID, label)
        {
            var textBoxContent = document.getElementById(textBoxID).value.trim();
            if(textBoxContent){
                combinedText += label + textBoxContent + "\n\n";
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

        function clearTextBoxes()
        {
            document.querySelectorAll('textarea').forEach(function(textarea) 
            {
                textarea.value = '';
            });

        }

        function initialLoad()
        {
            var textAreas = [
                {id: "textBox1", label: "Start Time:"},
                {id: "textBox2", label: "End Time:"},
                {id: "textBox3", label: "Tech Notes:"},
                {id: "textBox4", label: "Mount:"},
                {id: "textBox5", label: "Wire:"},
                {id: "textBox6", label: "Length of Wire Used:"},
                {id: "textBox7", label: "Available Towers/Scans:"},
                {id: "textBox8", label: "Additional Notes 1:"},
                {id: "textBox9", label: "Additional Notes 2:"},
                {id: "textBox10", label: "Additional Notes 3:"},
            ];
        
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
        };