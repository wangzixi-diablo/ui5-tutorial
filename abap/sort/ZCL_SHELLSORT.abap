CLASS zcl_shellsort DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    CLASS-METHODS sort
      IMPORTING
        !iv_table       TYPE abadr_tab_int4
      RETURNING
        VALUE(rv_table) TYPE abadr_tab_int4 .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS ZCL_SHELLSORT IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_SHELLSORT=>SORT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD sort.
    rv_table = iv_table.
    DATA(lv_length) = lines( iv_table ).
    DATA(lv_gap) = lv_length DIV 2.
    WHILE lv_gap > 0.
      DATA(i) = lv_gap.
      WHILE i < lv_length.
        DATA(j) = i.
        WHILE j > 0.
          DATA(left) = j - lv_gap + 1.
          DATA(right) = j + 1.
          IF left <= 0.
            EXIT.
          ENDIF.
          IF rv_table[ left ] > rv_table[ right ].
            DATA(temp) = rv_table[ left ].
            rv_table[ left ] = rv_table[ right ].
            rv_table[ right ] = temp.
          ELSE.
            EXIT.
          ENDIF.
          j = j - lv_gap.
        ENDWHILE.
        i = i + 1.
      ENDWHILE.
      lv_gap = lv_gap DIV 2.
    ENDWHILE.
  ENDMETHOD.
ENDCLASS.