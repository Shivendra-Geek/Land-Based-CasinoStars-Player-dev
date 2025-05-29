import { Select } from "@mantine/core";
import style from "./show-entries.module.scss";
import clsx from "clsx";
import { selectDropdownIcon } from "@/lib/utils/theme";

const ShowEntries = ({ className, setLimit, limit, setPage }) => {
     return (
          <div className={style.show_entries}>
            <span className={'theme_select_label'}>Show:</span>
            <Select
                className={clsx(className, 'theme_select', style.user_select)}
                checkIconPosition="right"
                data={['5', '10', '20', '30', '40', '50']}
                defaultValue={String(limit)}
                allowDeselect={false}
                rightSection={selectDropdownIcon}
                onChange={(e) => {
                    setLimit(Number(e));
                    setPage(1);
                }}
            />
            <span className={style.text}>Entries</span>
        </div>
     );
};

export default ShowEntries;
