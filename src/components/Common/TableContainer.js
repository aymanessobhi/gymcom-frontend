import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter";
import { useTranslation } from "react-i18next";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Col>
      {isJobListGlobalFilter && (
        <JobListGlobalFilter />
      )}
    </React.Fragment>
  );
};

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleStationClick,
  isAddStationList,
  customPageSize,
  className,
  customPageSizeOptions,
  handleEquipeClick,
  isAddEquipeList,
  handleDeptClick,
  handleEmployeClick,
  isAddEmployeList,
  isAddDeptList,
  handleDownloadTemp,
  handleUpload,
  handleLocaliteClick,
  isAddLocaliteList,
  handleCategorieClick,
  isAddCategorieList,
  isAddEquipementList,
  isAddOrigineList,
  handleEquipementClick,
  isAddPanneList,
  handlePanneClick,
  handleArticleClick,
  handleOrigineClick,
  isAddArticleList,
  isAddTypeFouList,
  handleTypeFouClick,
  isAddFournisseurList,
  handleFournisseurClick,
  isAddProducteurList,
  handleProducteurClick,
  isAddMarqueList,
  handleMarqueClick,
  isAddProduitList,
  handleProduitClick,
  isAddVarieteList,
  handleVarieteClick,
  isAddParcelleList,
  handleParcelleClick,
  isAddUniteList,
  handleUniteClick
}) => {

  const { t } = useTranslation('translation');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <Row className="mb-2">
        <Col md={customPageSizeOptions ? 2 : 1}>
          <select
            className="form-select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isJobListGlobalFilter={isJobListGlobalFilter}
          />
        )}
        {isAddOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        <Col  sm="7">
          <div className="input-group">
            <input accept="application/vnd.ms-excelapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet" type="file" className="form-control" id="customFile" onChange={handleUpload}/>
          </div>
        </Col>
        {isAddStationList && (
          <Col sm="3">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                size="sm"
                className="btn-rounded mb-2 me-2"
                onClick={handleStationClick}
              >
                <i className="mdi mdi-plus me-1" />
                {t('actions.new')}
              </Button>
              <Button
                type="button"
                size="sm"
                color="primary"
                className="btn-rounded mb-2 me-2"
                onClick={handleDownloadTemp}
              >
                <i className="mdi mdi-download me-1" />
                {t('actions.downloadTemp')}
              </Button>

            </div>
          </Col>
        )}
        {isAddLocaliteList && (
          <Col sm="3">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                size="sm"
                className="btn-rounded mb-2 me-2"
                onClick={handleLocaliteClick}
              >
                <i className="mdi mdi-plus me-1" />
                {t('actions.new')}
              </Button>
              <Button
                type="button"
                size="sm"
                color="primary"
                className="btn-rounded mb-2 me-2"
                onClick={handleDownloadTemp}
              >
                <i className="mdi mdi-download me-1" />
                {t('actions.downloadTemp')}
              </Button>
            </div>
          </Col>
        )}
        {isAddPanneList && (
          <Col sm="3">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                size="sm"
                className="btn-rounded mb-2 me-2"
                onClick={handlePanneClick}
              >
                <i className="mdi mdi-plus me-1" />
                {t('actions.new')}
              </Button>
              <Button
                type="button"
                size="sm"
                color="primary"
                className="btn-rounded mb-2 me-2"
                onClick={handleDownloadTemp}
              >
                <i className="mdi mdi-download me-1" />
                {t('actions.downloadTemp')}
              </Button>
            </div>
          </Col>
        )}
        {isAddEquipementList && (
          <Col sm="3">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                size="sm"
                className="btn-rounded mb-2 me-2"
                onClick={handleEquipementClick}
              >
                <i className="mdi mdi-plus me-1" />
                {t('actions.new')}
              </Button>
              <Button
                type="button"
                size="sm"
                color="primary"
                className="btn-rounded mb-2 me-2"
                onClick={handleDownloadTemp}
              >
                <i className="mdi mdi-download me-1" />
                {t('actions.downloadTemp')}
              </Button>
            </div>
          </Col>
        )}
        {
          isAddOrigineList && (
            <Col sm="3">
              <div className="text-sm-end">
                <Button
                  type="button"
                  color="success"
                  size="sm"
                  className="btn-rounded mb-2 me-2"
                  onClick={handleOrigineClick}
                >
                  <i className="mdi mdi-plus me-1" />
                  {t('actions.new')}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  color="primary"
                  className="btn-rounded mb-2 me-2"
                  onClick={handleDownloadTemp}
                >
                  <i className="mdi mdi-download me-1" />
                  {t('actions.downloadTemp')}
                </Button>
              </div>
            </Col>
          )
        }
         {isAddCategorieList && (
          <Col sm="3">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                size="sm"
                className="btn-rounded mb-2 me-2"
                onClick={handleCategorieClick}
              >
                <i className="mdi mdi-plus me-1" />
                {t('actions.new')}
              </Button>
              <Button
                type="button"
                size="sm"
                color="primary"
                className="btn-rounded mb-2 me-2"
                onClick={handleDownloadTemp}
              >
                <i className="mdi mdi-download me-1" />
                {t('actions.downloadTemp')}
              </Button>
            </div>
          </Col>
        )}
        {isAddEquipeList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleEquipeClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {isAddEmployeList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleEmployeClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {isAddDeptList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleDeptClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
         {isAddArticleList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleArticleClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {isAddFournisseurList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleFournisseurClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {isAddProducteurList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleProducteurClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {isAddProduitList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleProduitClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {isAddVarieteList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleVarieteClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {isAddMarqueList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleMarqueClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {isAddParcelleList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleParcelleClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {isAddTypeFouList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleTypeFouClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {isAddUniteList && (
          <Col sm="3">
          <div className="text-sm-end">
            <Button
              type="button"
              color="success"
              size="sm"
              className="btn-rounded mb-2 me-2"
              onClick={handleUniteClick}
            >
              <i className="mdi mdi-plus me-1" />
              {t('actions.new')}
            </Button>
            <Button
              type="button"
              size="sm"
              color="primary"
              className="btn-rounded mb-2 me-2"
              onClick={handleDownloadTemp}
            >
              <i className="mdi mdi-download me-1" />
              {t('actions.downloadTemp')}
            </Button>
          </div>
        </Col>
        )}
        {/* {canDownloadtemp && (
          <Col sm="3">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn-rounded mb-2 me-2"
                onClick={handleDownloadTemp}
              >
                <i className="mdi mdi-download me-1" />
                {t('actions.downloadTemp')}
              </Button>
            </div>
          </Col>
        )} */}
      </Row>

      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th key={column.id}>
                    <div className="mb-2" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map(cell => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
