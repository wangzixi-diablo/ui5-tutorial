CLASS zcl_mergesort DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    CLASS-METHODS sort
      IMPORTING
        !iv_table       TYPE abadr_tab_int4
      RETURNING
        VALUE(rv_table) TYPE abadr_tab_int4 .
    CLASS-METHODS sort2
      IMPORTING
        !iv_table       TYPE abadr_tab_int4
      RETURNING
        VALUE(rv_table) TYPE abadr_tab_int4 .
  PROTECTED SECTION.
  PRIVATE SECTION.

    TYPES:
      BEGIN OF ty_work_area,
        index   TYPE int4,
        content TYPE abadr_tab_int4,
      END OF ty_work_area .
    TYPES:
      tt_work_area TYPE TABLE OF ty_work_area WITH KEY index .

    CLASS-METHODS concat
      IMPORTING
        !iv_merged       TYPE abadr_tab_int4
        !iv_left         TYPE abadr_tab_int4
        !iv_right        TYPE abadr_tab_int4
      RETURNING
        VALUE(rv_result) TYPE abadr_tab_int4 .
    CLASS-METHODS cut_table
      IMPORTING
        !iv_origin    TYPE abadr_tab_int4
        !iv_start     TYPE int4
        !iv_end       TYPE int4
      RETURNING
        VALUE(rv_sub) TYPE abadr_tab_int4 .
    CLASS-METHODS merge
      CHANGING
        !cv_left         TYPE abadr_tab_int4
        !cv_right        TYPE abadr_tab_int4
      RETURNING
        VALUE(rv_merged) TYPE abadr_tab_int4 .
    CLASS-METHODS shift
      EXPORTING
        !ev_element TYPE int4
      CHANGING
        !cv_table   TYPE abadr_tab_int4 .
ENDCLASS.



CLASS ZCL_MERGESORT IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Private Method ZCL_MERGESORT=>CONCAT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_MERGED                      TYPE        ABADR_TAB_INT4
* | [--->] IV_LEFT                        TYPE        ABADR_TAB_INT4
* | [--->] IV_RIGHT                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_RESULT                      TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD concat.
    APPEND LINES OF iv_merged TO rv_result.
    APPEND LINES OF iv_left TO rv_result.
    APPEND LINES OF iv_right TO rv_result.
  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Private Method ZCL_MERGESORT=>CUT_TABLE
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_ORIGIN                      TYPE        ABADR_TAB_INT4
* | [--->] IV_START                       TYPE        INT4
* | [--->] IV_END                         TYPE        INT4
* | [<-()] RV_SUB                         TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD cut_table.
    LOOP AT iv_origin ASSIGNING FIELD-SYMBOL(<item>) FROM iv_start TO iv_end.
      APPEND <item> TO rv_sub.
    ENDLOOP.
  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Private Method ZCL_MERGESORT=>MERGE
* +-------------------------------------------------------------------------------------------------+
* | [<-->] CV_LEFT                        TYPE        ABADR_TAB_INT4
* | [<-->] CV_RIGHT                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_MERGED                      TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD merge.
    DATA:lv_shift TYPE int4.

    WHILE lines( cv_left ) > 0 AND lines( cv_right ) > 0.
      IF cv_left[ 1 ] < cv_right[ 1 ].
        shift( IMPORTING ev_element = lv_shift
               CHANGING cv_table = cv_left ).
      ELSE.
        shift( IMPORTING ev_element = lv_shift
               CHANGING cv_table = cv_right ).
      ENDIF.
      APPEND lv_shift TO rv_merged.
    ENDWHILE.

    rv_merged = concat( iv_merged = rv_merged iv_left = cv_left iv_right = cv_right ).
    CLEAR: cv_left, cv_right.
  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Private Method ZCL_MERGESORT=>SHIFT
* +-------------------------------------------------------------------------------------------------+
* | [<---] EV_ELEMENT                     TYPE        INT4
* | [<-->] CV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD shift.
    ev_element = cv_table[ 1 ].
    DELETE cv_table INDEX 1.
  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_MERGESORT=>SORT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD sort.
    IF lines( iv_table ) = 1.
      rv_table = iv_table.
      RETURN.
    ENDIF.

    DATA(lv_middle) = lines( iv_table ) DIV 2.

    DATA(lv_left) = cut_table( iv_origin = iv_table iv_start = 1 iv_end = lv_middle ).
    DATA(lv_right) = cut_table( iv_origin = iv_table iv_start = lv_middle + 1
                                iv_end = lines( iv_table ) ).

    DATA(lv_left_sorted) = sort( lv_left ).
    DATA(lv_right_sorted) = sort( lv_right ).

    rv_table = merge( CHANGING cv_left = lv_left_sorted
                      cv_right = lv_right_sorted ).

  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_MERGESORT=>SORT2
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD sort2.

    IF lines( iv_table ) = 1.
      rv_table = iv_table.
      RETURN.
    ENDIF.

    DATA: lt_workarea TYPE tt_work_area,
          ls_workarea LIKE LINE OF lt_workarea,
          lv_limit    TYPE int4,
          j           TYPE int4,
          k           TYPE int4.

    DATA(lv_len) = lines( iv_table ).

    DO lv_len TIMES.
      CLEAR: ls_workarea.
      ls_workarea-index = sy-index.
      APPEND iv_table[ sy-index ] TO ls_workarea-content.
      APPEND ls_workarea TO lt_workarea.
    ENDDO.

    CLEAR: ls_workarea.
    ls_workarea-index = lv_len + 1.
    APPEND ls_workarea TO lt_workarea.

    lv_limit = lv_len.
    WHILE lv_limit > 1.
      j = k = 1.
      WHILE k < lv_limit + 1.
        DATA(merged) = merge( CHANGING cv_left = lt_workarea[ k ]-content
               cv_right = lt_workarea[ k + 1 ]-content ).
        lt_workarea[ j ]-content = merged.
        j = j + 1.
        k = k + 2.
      ENDWHILE.

*      CLEAR: ls_workarea.
*      ls_workarea-index = j.
*      APPEND ls_workarea TO lt_workarea.
      lv_limit = ( lv_limit + 1 ) DIV 2.
    ENDWHILE.

    APPEND LINES OF lt_workarea[ 1 ]-content TO rv_table.
  ENDMETHOD.
ENDCLASS.