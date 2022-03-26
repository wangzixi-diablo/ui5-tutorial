CLASS zcl_sort_helper DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    CLASS-METHODS start_measure .
    CLASS-METHODS print
      IMPORTING
        !iv_table TYPE abadr_tab_int4 .
    CLASS-METHODS generate_data
      IMPORTING
        !iv_num         TYPE int4
      RETURNING
        VALUE(rv_table) TYPE abadr_tab_int4 .
    CLASS-METHODS stop
      RETURNING
        VALUE(rv_duration) TYPE int4 .
  PROTECTED SECTION.
  PRIVATE SECTION.

    CLASS-DATA mv_start TYPE int4 .
ENDCLASS.



CLASS ZCL_SORT_HELPER IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_SORT_HELPER=>GENERATE_DATA
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_NUM                         TYPE        INT4
* | [<-()] RV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD generate_data.
    ASSERT iv_num > 0.
    DATA: lv_seed TYPE i.
    lv_seed = sy-timlo.
    DATA(lo_ran) = cl_abap_random_int=>create( min = 1 max = 1000 seed = lv_seed ).
    DO iv_num TIMES.
      APPEND lo_ran->get_next( ) TO rv_table.
    ENDDO.
  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_SORT_HELPER=>PRINT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD print.
    DATA: lv_print TYPE string.
    LOOP AT iv_table ASSIGNING FIELD-SYMBOL(<element>).
      IF sy-tabix = 1.
        lv_print = <element>.
      ELSE.
        lv_print = lv_print && ',' && <element>.
      ENDIF.
    ENDLOOP.

    WRITE: / lv_print COLOR COL_NEGATIVE.
  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_SORT_HELPER=>START_MEASURE
* +-------------------------------------------------------------------------------------------------+
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD start_measure.
    CLEAR: mv_start.

    GET RUN TIME FIELD mv_start.
  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_SORT_HELPER=>STOP
* +-------------------------------------------------------------------------------------------------+
* | [<-()] RV_DURATION                    TYPE        INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD stop.
    DATA: lv_end TYPE int4.
    GET RUN TIME FIELD lv_end.

    rv_duration = lv_end - mv_start.
  ENDMETHOD.
ENDCLASS.