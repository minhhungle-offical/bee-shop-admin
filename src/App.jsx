import { useForm } from "react-hook-form";
import "./App.css";
import { InputField } from "./components/FormFields/InputField";
import { TextareaField } from "./components/FormFields/TextareaField";
import { SelectField } from "./components/FormFields/SelectField";
import { genderList } from "./constants/common";
import { DateField } from "./components/FormFields/DateField";
import { TimeField } from "./components/FormFields/TimeField";
import { UploadField } from "./components/FormFields/UploadField";
import { MultiUploadField } from "./components/FormFields/MultiUploadField";

function App() {
  const { control, handleSubmit } = useForm({});

  const handleFormSubmit = handleSubmit((data) => {
    console.log("data: ", data);
  });

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col space-y-3">
      <InputField name="name" label="Name" control={control} />

      <SelectField
        name="gender"
        control={control}
        label="Gender"
        options={genderList}
      />

      <DateField name="day" control={control} label="Day" />
      <TimeField name="time" control={control} label="Time" />
      <TextareaField
        name="content"
        control={control}
        label="Content"
        rows={10}
      />

      <div className="w-1/3">
        <UploadField name="upload" control={control} label="Upload" />
      </div>

      <div className="w-full">
        <MultiUploadField name="uploads" control={control} label="Uploads" />
      </div>

      <div className="flex items-start">
        <button type="submit" className="px-2 py-1 border">
          Submit
        </button>
      </div>
    </form>
  );
}

export default App;
