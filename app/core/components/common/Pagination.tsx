import React, { FC } from "react"
import ReactPaginate from "react-paginate"
import styles from "./Pagination.module.css"
import { Flex, FormControl, Select } from "@chakra-ui/react"
import { TAKE } from "app/core/configs"

export interface PaginationProps {
  pageCount: number
  take?: number
  curPage: number
  onPageChange: (pageObj: any) => void
  onTakeChange?: (value: number) => void
}

const Pagination: FC<PaginationProps> = ({
  pageCount,
  take,
  onPageChange,
  onTakeChange,
  curPage,
}) => {
  return (
    <Flex alignItems="flex-end">
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        initialPage={curPage - 1}
        marginPagesDisplayed={5}
        pageRangeDisplayed={1}
        onPageChange={onPageChange}
        containerClassName={styles.container}
        pageClassName={styles.page}
        previousClassName={styles.previous}
        nextClassName={styles.next}
        activeClassName={styles.active}
      />
      {take && onTakeChange && (
        <FormControl marginLeft={5}>
          <Select value={take} onChange={(e) => onTakeChange(Number(e.target.value))} required>
            {TAKE.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
    </Flex>
  )
}

export default Pagination
