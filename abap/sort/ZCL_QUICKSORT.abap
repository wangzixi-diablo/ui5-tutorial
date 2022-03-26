CLASS zcl_quicksort DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    CLASS-METHODS sort
      IMPORTING
        !iv_table        TYPE abadr_tab_int4
      RETURNING
        VALUE(rv_result) TYPE abadr_tab_int4 .
  PROTECTED SECTION.
  PRIVATE SECTION.

    CLASS-METHODS sort_internal
      IMPORTING
        !iv_left  TYPE int4
        !iv_right TYPE int4
      CHANGING
        !cv_table TYPE abadr_tab_int4 .
ENDCLASS.



CLASS ZCL_QUICKSORT IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_QUICKSORT=>SORT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_RESULT                      TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD sort.
    rv_result = iv_table.
    sort_internal( EXPORTING iv_left = 1 iv_right = lines( rv_result )
                   CHANGING cv_table = rv_result ).

  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Private Method ZCL_QUICKSORT=>SORT_INTERNAL
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_LEFT                        TYPE        INT4
* | [--->] IV_RIGHT                       TYPE        INT4
* | [<-->] CV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD sort_internal.
    DATA: lv_temp TYPE int4.
    IF iv_left < iv_right.
      DATA(x) = cv_table[ iv_right ].
      DATA(i) = iv_left - 1.
      DATA(j) = iv_left.
      WHILE j <= iv_right.
        IF cv_table[ j ] <= x.
          i = i + 1.
          lv_temp = cv_table[ i ].
          cv_table[ i ] = cv_table[ j ].
          cv_table[ j ] = lv_temp.
        ENDIF.
        j = j + 1.
      ENDWHILE.

      sort_internal( EXPORTING iv_left = iv_left iv_right = i - 1
                     CHANGING cv_table = cv_table ).
      sort_internal( EXPORTING iv_left = i + 1 iv_right = iv_right
                     CHANGING cv_table = cv_table ).

    ENDIF.
  ENDMETHOD.
ENDCLASS.