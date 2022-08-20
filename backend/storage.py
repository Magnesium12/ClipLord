import os

class Storage:
    @staticmethod
    def export_data(text,username):
        if os.path.exists(f"{username}.data"):
            length = len(Storage.import_data(username))
            with open(f"{username}.data", "r") as f:
                all_data = f.read()
                lines = all_data.split('\n')
                while("" in lines) :
                    lines.remove("")
                if text != "":
                    lines.append(text)
                    length += 1
                if length==11:
                    lines.pop(0)
                #f.close()
            with open(f"{username}.data", "w") as f:
                for line in lines:
                    f.write(line+'\n')
                f.close()
        else:
            with open(f"{username}.data", "w") as f:
                if text != "":
                    f.write(text+'\n')
                f.close()

    @staticmethod
    def import_data(username):
        if os.path.exists(f"{username}.data"):
            with open(f"{username}.data", "r",encoding="utf-8") as file:
                all_data = file.read()
                filtered_data = all_data.split('\n')
                filtered_data.reverse()
                while("" in filtered_data) :
                    filtered_data.remove("")
                return filtered_data
        else:
            return []