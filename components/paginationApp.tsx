import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"


export default function PaginationApp({ totalPages, currentPage, onChange }: { totalPages: number, currentPage: number, onChange: (page: number) => void }) {

  const handleClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onChange(newPage)
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handleClick(currentPage - 1)} className="cursor-pointer"/>
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p} className="cursor-pointer">
            <PaginationLink
              isActive={p === currentPage}
              onClick={() => handleClick(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => handleClick(currentPage + 1)} className="cursor-pointer"/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
